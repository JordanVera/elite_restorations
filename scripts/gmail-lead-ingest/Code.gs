/**
 * Elite Restorations lead ingest.
 *
 * Install this same file twice: once in admin@eliterestorations.com and once
 * in george@eliterestorations.com. Each copy reads only that mailbox. Both
 * copies handle Google Voice and Local Services mail. The server dedupes by
 * external id, so overlap is safe.
 *
 * Parser behavior matches src/server/leads/gmail-parse.ts. Keep the two in step.
 *
 * Script properties:
 *   LEAD_INGEST_URL     https://eliterestorations.com/api/leads/inbound
 *   LEAD_INGEST_SECRET  same value as Vercel LEAD_INGEST_SECRET
 *
 * Run installLeadIngestTrigger once from the editor. It installs a 30-minute trigger.
 */

var LEAD_SEARCH_ =
  "-label:JobberSynced newer_than:2d (from:txt.voice.google.com OR from:voice-noreply@google.com OR from:awexpress.google.com OR from:localservices-noreply@google.com)";

var PHONE_PATTERN_ = /(?:\+?1[\s.-]*)?\(?\d{3}\)?[\s.-]*\d{3}[\s.-]*\d{4}/;
var FOOTER_ = [
  /^--\s*$/,
  /^to respond to this text/i,
  /^reply to this email/i,
  /^your account\b/i,
  /^help center\b/i,
  /^view (the |this )?(conversation|message|request)/i,
  /^google voice\b/i,
  /^this email was sent/i,
  /^you received this/i,
  /^get the app\b/i,
];
var BLOCK_LABELS_ = ["Name", "Location", "Service type", "Message"];

function installLeadIngestTrigger() {
  var handler = "ingestNewLeads";
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === handler) ScriptApp.deleteTrigger(triggers[i]);
  }
  ScriptApp.newTrigger(handler).timeBased().everyMinutes(30).create();
  console.log("lead ingest trigger installed for every 30 minutes");
}

function ingestNewLeads() {
  var config = readConfig_();
  if (!config) {
    console.log("lead ingest is not configured");
    return;
  }
  var label = jobberLabel_();
  var threads = GmailApp.search(LEAD_SEARCH_, 0, 25);
  var posts = 0;
  for (var i = 0; i < threads.length; i++) {
    posts = processThread_(threads[i], label, config, posts);
    if (posts >= 40) break;
  }
}

function readConfig_() {
  var props = PropertiesService.getScriptProperties();
  var url = props.getProperty("LEAD_INGEST_URL") || "";
  var secret = props.getProperty("LEAD_INGEST_SECRET") || "";
  if (!url || !secret) return null;
  return { url: url, secret: secret };
}

function jobberLabel_() {
  return GmailApp.getUserLabelByName("JobberSynced") || GmailApp.createLabel("JobberSynced");
}

function processThread_(thread, label, config, posts) {
  var messages = thread.getMessages();
  var anyFailure = false;
  var anySuccess = false;
  var stoppedEarly = false;
  for (var i = 0; i < messages.length; i++) {
    if (posts >= 40) {
      stoppedEarly = true;
      break;
    }
    var outcome = processMessage_(messages[i], config);
    if (outcome === "success" || outcome === "failure") posts += 1;
    if (outcome === "success") anySuccess = true;
    if (outcome === "failure") anyFailure = true;
  }
  if (anySuccess && !anyFailure && !stoppedEarly) thread.addLabel(label);
  return posts;
}

function processMessage_(message, config) {
  var input = messageInput_(message);
  var parsed = parseGmailLead_(input);
  if (parsed.action === "skip") {
    console.log("lead ingest skip " + parsed.reason);
    return "skip";
  }
  var code = postLead_(config.url, config.secret, parsed.lead);
  if (code === 200) return "success";
  return "failure";
}

function messageInput_(message) {
  var messageId = header_(message, "Message-ID") || header_(message, "Message-Id");
  messageId = String(messageId || "").trim();
  if (!messageId) messageId = "gmail:" + message.getId();
  var occurred = message.getDate();
  return {
    from: message.getFrom() || "",
    replyTo: message.getReplyTo() || "",
    subject: message.getSubject() || "",
    body: message.getPlainBody() || "",
    messageId: messageId,
    occurredAt: occurred ? occurred.toISOString() : new Date().toISOString(),
  };
}

function header_(message, name) {
  try {
    return message.getHeader(name) || "";
  } catch (error) {
    return "";
  }
}

function postLead_(url, secret, lead) {
  var payload = {};
  var keys = Object.keys(lead);
  for (var i = 0; i < keys.length; i++) {
    if (lead[keys[i]]) payload[keys[i]] = lead[keys[i]];
  }
  try {
    var response = UrlFetchApp.fetch(url, {
      method: "post",
      contentType: "application/json",
      headers: { Authorization: "Bearer " + secret },
      payload: JSON.stringify(payload),
      muteHttpExceptions: true,
    });
    var code = response.getResponseCode();
    console.log("lead ingest " + payload.source + " http " + code);
    return code;
  } catch (error) {
    console.log("lead ingest fetch failed");
    return 0;
  }
}

function parseGmailLead_(input) {
  var from = addressOf_(decodeBasic_(input.from));
  var subject = decodeBasic_(input.subject).trim();
  var body = decodeBasic_(input.body).slice(0, 20000);
  var forVoice = {
    from: decodeBasic_(input.from),
    subject: subject,
    body: body,
    messageId: input.messageId,
    occurredAt: input.occurredAt,
    replyTo: input.replyTo,
  };

  if (from === "localservices-noreply@google.com" || endsWith_(from, "@localservices-noreply.google.com")) {
    if (/new call from a potential customer/i.test(subject)) return { action: "skip", reason: "lsa-call" };
    return { action: "skip", reason: "marketing" };
  }

  var lsa = from.match(/^customer-request-(\d+)@awexpress\.google\.com$/);
  if (lsa && lsa[1]) {
    var parsedSubject = lsaSubject_(subject);
    if (parsedSubject.followUp) return { action: "skip", reason: "follow-up" };
    if (!parsedSubject.request) return { action: "skip", reason: "marketing" };
    var fields = blocks_(body);
    var blockName = cleanName_(fields.Name || "");
    var name = blockName || parsedSubject.name;
    return {
      action: "lead",
      lead: {
        source: "lsa_message",
        externalId: "lsa:" + lsa[1],
        occurredAt: (input.occurredAt || "").trim().slice(0, 80) || "unknown",
        name: name,
        address: clip_(fields.Location, 300),
        service: clip_(fields["Service type"], 200),
        message: clip_(fields.Message, 5000),
        rawSubject: clip_(subject, 500),
      },
    };
  }

  if (endsWith_(from, "@txt.voice.google.com")) {
    if (!/new text message from\b/i.test(subject)) return { action: "skip", reason: "not-a-lead" };
    return voiceLead_("google_voice_text", "text", forVoice, /^new text message from\s+(.+)$/i);
  }

  if (from === "voice-noreply@google.com") {
    if (/voicemail/i.test(subject)) {
      return voiceLead_("google_voice_voicemail", "voicemail", forVoice, /^(?:new )?voicemail from\s+(.+)$/i);
    }
    if (/missed call/i.test(subject)) {
      return voiceLead_("google_voice_missed_call", "missed", forVoice, /^missed call from\s+(.+)$/i);
    }
    return { action: "skip", reason: "not-a-lead" };
  }

  if (endsWith_(from, "@awexpress.google.com") || endsWith_(from, "@google.com")) {
    return { action: "skip", reason: "marketing" };
  }
  return { action: "skip", reason: "not-a-lead" };
}

function voiceLead_(source, kind, input, subjectPrefix) {
  var messageId = (input.messageId || "").trim();
  if (!messageId) return { action: "skip", reason: "missing-id" };
  var phone = leadPhone_(input.subject, input.from, input.body);
  if (!phone) return { action: "skip", reason: "missing-phone" };
  var extension = extensionNear_(input.subject + "\n" + input.from, phone);
  var message = voiceMessage_(kind, input.body, input.subject);
  var name = callerName_(subjectRest_(input.subject, subjectPrefix), input.from);
  return {
    action: "lead",
    lead: {
      source: source,
      externalId: messageId.slice(0, 500),
      occurredAt: (input.occurredAt || "").trim().slice(0, 80) || "unknown",
      name: name,
      phone: phone.slice(0, 40),
      phoneExtension: extension,
      message: optional_(message),
      replyTo: clip_(input.replyTo, 500),
      rawSubject: clip_(input.subject, 500),
    },
  };
}

function decodeBasic_(value) {
  return String(value || "")
    .replace(/\u00a0/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&quot;/gi, '"');
}

function addressOf_(from) {
  var match = String(from || "").match(/<([^>]+)>/);
  return (match ? match[1] : from || "").trim().toLowerCase();
}

function endsWith_(value, suffix) {
  return String(value || "").slice(-suffix.length) === suffix;
}

function firstPhone_(value) {
  var match = String(value || "").match(PHONE_PATTERN_);
  return match ? match[0] : "";
}

function textWithoutPhone_(value) {
  return String(value || "")
    .replace(PHONE_PATTERN_, " ")
    .replace(/[|()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanName_(value) {
  var name = String(value || "")
    .replace(/^from\s+/i, "")
    .replace(/^["']+|["']+$/g, "")
    .trim();
  if (name.length < 2) return undefined;
  if (/^(new text message|new voicemail|voicemail|missed call|google voice|potential customer)$/i.test(name)) {
    return undefined;
  }
  return name.slice(0, 200);
}

function callerName_(subjectRest, fromHeader) {
  var fromSubject = cleanName_(textWithoutPhone_(subjectRest));
  if (fromSubject) return fromSubject;
  var display = String(fromHeader || "").split("<")[0] || "";
  return cleanName_(textWithoutPhone_(display));
}

function cutFooter_(body) {
  var lines = String(body || "").replace(/\r\n/g, "\n").split("\n");
  var kept = [];
  for (var i = 0; i < lines.length; i++) {
    var trimmed = lines[i].trim();
    var stop = false;
    for (var j = 0; j < FOOTER_.length; j++) {
      if (FOOTER_[j].test(trimmed)) stop = true;
    }
    if (stop) break;
    kept.push(lines[i]);
  }
  return kept.join("\n").trim();
}

function extensionNear_(value, phone) {
  var index = phone ? String(value || "").indexOf(phone) : -1;
  var slice = index >= 0 ? String(value).slice(index, index + phone.length + 24) : "";
  var match = slice.match(/(?:ext\.?|extension|x)\s*(\d{1,8})\b/i);
  return match ? match[1] : undefined;
}

function leadPhone_(subject, fromHeader, body) {
  return firstPhone_(subject) || firstPhone_(fromHeader) || firstPhone_(cutFooter_(body).slice(0, 500));
}

function voiceMessage_(kind, body, subject) {
  var clipped = cutFooter_(body);
  var transcript = clipped.match(/transcript:\s*([\s\S]+)/i);
  if (transcript && transcript[1]) return transcript[1].trim().slice(0, 5000);
  if (kind !== "text") return "";
  var lines = clipped
    .split("\n")
    .map(function (line) {
      return line.trim();
    })
    .filter(Boolean);
  while (lines.length && /^new text message from\b/i.test(lines[0] || "")) lines.shift();
  if (lines[0] && lines[0].toLowerCase() === String(subject || "").trim().toLowerCase()) lines.shift();
  return lines.join("\n").trim().slice(0, 5000);
}

function subjectRest_(subject, prefix) {
  var match = String(subject || "").match(prefix);
  return match && match[1] ? match[1].trim() : "";
}

function labelFor_(value) {
  for (var i = 0; i < BLOCK_LABELS_.length; i++) {
    if (BLOCK_LABELS_[i].toLowerCase() === String(value || "").toLowerCase()) return BLOCK_LABELS_[i];
  }
  return "";
}

function blocks_(body) {
  var lines = cutFooter_(body).replace(/\r\n/g, "\n").split("\n");
  var found = {};
  var current = "";
  for (var i = 0; i < lines.length; i++) {
    var trimmed = lines[i].trim();
    var inline = trimmed.match(/^-\s*([^:]+?)\s*:\s*(.+)$/);
    if (inline && inline[1] && inline[2]) {
      var inlineLabel = labelFor_(inline[1].trim());
      if (inlineLabel) {
        found[inlineLabel] = [inline[2].trim()];
        current = "";
        continue;
      }
    }
    var heading = trimmed.match(/^-\s*([^:]+?)\s*:?\s*$/);
    if (heading && heading[1]) {
      var headingLabel = labelFor_(heading[1].trim());
      if (headingLabel) {
        current = headingLabel;
        found[current] = [];
        continue;
      }
    }
    if (!current) continue;
    if (!trimmed) {
      if ((found[current] || []).length) current = "";
      continue;
    }
    found[current] = (found[current] || []).concat([trimmed]);
  }
  var result = {};
  for (var j = 0; j < BLOCK_LABELS_.length; j++) {
    var label = BLOCK_LABELS_[j];
    var text = (found[label] || []).join("\n").trim();
    if (text) result[label] = text.slice(0, label === "Message" ? 5000 : 300);
  }
  return result;
}

function lsaSubject_(subject) {
  var cleaned = String(subject || "").replace(/^re:\s*/i, "").trim();
  if (/sent you a message/i.test(cleaned)) return { followUp: true, request: false };
  if (/^potential customer['’]s new request$/i.test(cleaned)) return { followUp: false, request: true };
  var named = cleaned.match(/^(.+?)['’]s new request$/i);
  if (named && named[1]) return { followUp: false, request: true, name: cleanName_(named[1]) };
  return { followUp: false, request: false };
}

function optional_(value) {
  var trimmed = String(value || "").trim();
  return trimmed ? trimmed : undefined;
}

function clip_(value, max) {
  var trimmed = String(value || "").trim();
  if (!trimmed) return undefined;
  return trimmed.slice(0, max);
}
