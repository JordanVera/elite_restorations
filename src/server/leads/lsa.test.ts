import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  adsDateTime,
  conversationQuery,
  googleAdsRequestHeaders,
  inboundFromLsa,
  initialWatermark,
  leadQuery,
  leadRowShapeOk,
  messageForLead,
  nextWatermark,
  readConversationRow,
  readLeadRow,
} from "./lsa";
import { titleFor } from "./inbound-lead";

describe("Local Services mapping", () => {
  it("maps a phone lead and a message lead onto the shared ingest ids", () => {
    const phone = readLeadRow({
      localServicesLead: {
        id: "48211",
        leadType: "PHONE_CALL",
        categoryId: "xcat:service_area_business_roofing",
        creationDateTime: "2026-11-13 12:04:00",
        contactDetails: {
          consumerName: "Ada Stone",
          phoneNumber: "+1 713-555-0148",
          phoneNumberExtension: "12",
        },
      },
    });
    assert.ok(phone);
    const phoneLead = inboundFromLsa(phone, "", phone.creationDateTime);
    assert.equal(phoneLead?.source, "lsa_phone");
    assert.equal(phoneLead?.externalId, "lsa:48211");
    assert.equal(phoneLead?.phoneExtension, "12");
    assert.equal(titleFor(phoneLead?.source ?? "lsa_phone", phoneLead?.service), "Google LSA phone lead");

    const messageRow = readLeadRow({
      localServicesLead: {
        id: 99,
        leadType: "MESSAGE",
        categoryId: "xcat:service_area_business_water_damage",
        creationDateTime: "2026-11-13 12:10:00",
        contactDetails: { consumerName: "Pat Customer", phoneNumber: "" },
      },
    });
    assert.ok(messageRow);
    const conversations = [
      readConversationRow({
        localServicesLeadConversation: {
          lead: "customers/8441992586/localServicesLeads/99",
          participantType: "ADVERTISER",
          messageDetails: { text: "We will call you." },
        },
      }),
      readConversationRow({
        localServicesLeadConversation: {
          lead: "customers/8441992586/localServicesLeads/99",
          participantType: "CONSUMER",
          messageDetails: { text: "The ceiling is wet." },
        },
      }),
    ].filter((row) => row !== null);
    const text = messageForLead("99", conversations);
    assert.equal(text, "The ceiling is wet.");
    const messageLead = inboundFromLsa(messageRow, text, messageRow.creationDateTime);
    assert.equal(messageLead?.source, "lsa_message");
    assert.equal(messageLead?.externalId, "lsa:99");
    assert.equal(messageLead?.service, "Water Damage");
    assert.equal(titleFor("lsa_message", messageLead?.service), "Google LSA message · Water Damage");
    assert.equal(JSON.stringify(messageLead).includes("We will call you"), false);
  });

  it("queries the lead and conversation fields from a watermark", () => {
    const since = "2026-11-11 12:00:00";
    const leads = leadQuery(since);
    assert.equal(leads.includes("local_services_lead.contact_details.consumer_name"), true);
    assert.equal(leads.includes("local_services_lead.contact_details.phone_number"), true);
    assert.equal(leads.includes("local_services_lead.contact_details.phone_number_extension"), true);
    assert.equal(leads.includes("local_services_lead.category_id"), true);
    assert.equal(leads.includes("local_services_lead.lead_type"), true);
    assert.equal(leads.includes("local_services_lead.creation_date_time"), true);
    assert.equal(leads.includes("local_services_lead.id"), true);
    assert.equal(leads.includes(since), true);
    assert.equal(conversationQuery(since).includes("local_services_lead_conversation.message_details.text"), true);
    assert.throws(() => leadQuery("yesterday"), /Invalid watermark/);
  });

  it("formats the account timezone and sends the developer token only when set", () => {
    assert.equal(adsDateTime(new Date("2026-11-13T18:00:00.000Z")), "2026-11-13 12:00:00");
    const first = initialWatermark(new Date("2026-11-13T18:00:00.000Z"));
    assert.equal(first, "2026-11-11 12:00:00");
    assert.equal(nextWatermark("2026-11-13 12:30:00", new Date("2026-11-13T18:00:00.000Z")), "2026-11-13 12:30:00");
    assert.equal(nextWatermark("2026-11-01 08:00:00", new Date("2026-11-13T18:00:00.000Z")), "2026-11-13 10:00:00");

    const plain = googleAdsRequestHeaders("access-token");
    assert.equal(plain.authorization, "Bearer access-token");
    assert.equal("developer-token" in plain, false);
    assert.equal(googleAdsRequestHeaders("access-token", "optional-token")["developer-token"], "optional-token");
  });

  it("skips a wiped lead that has no name, phone, or message", () => {
    const wiped = readLeadRow({
      localServicesLead: {
        id: "7",
        leadType: "PHONE_CALL",
        categoryId: "",
        creationDateTime: "2026-11-13 12:00:00",
        contactDetails: null,
      },
    });
    assert.ok(wiped);
    assert.equal(inboundFromLsa(wiped, "", wiped.creationDateTime), null);
    assert.equal(leadRowShapeOk({ localServicesLead: { id: "7", contactDetails: null } }), true);
    assert.equal(leadRowShapeOk({ localServicesLead: { id: "7" } }), false);
  });
});
