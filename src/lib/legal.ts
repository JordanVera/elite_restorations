import { site } from '@/lib/site';

export const legalEffectiveDate = 'November 13, 2026';

export type LegalSection = {
  heading: string;
  paragraphs: string[];
  items?: string[];
};

const address = `${site.address.streetAddress}, ${site.address.addressLocality}, ${site.address.addressRegion} ${site.address.postalCode}`;

export const privacySections: LegalSection[] = [
  {
    heading: 'Who this covers',
    paragraphs: [
      `${site.name} is a family-owned restoration, remodeling, and roofing company at ${address}. This policy explains what we collect on ${site.url.replace('https://', '')} and how we use it. It is written in plain language for a Texas home-services contractor.`,
      `Questions about this policy go to ${site.email} or ${site.phone.display}.`,
    ],
  },
  {
    heading: 'Information we collect',
    paragraphs: [
      'The contact form, the emergency form, and the realtor partner form are how most information reaches us. Depending on the form, you may send:',
    ],
    items: [
      'Your name',
      'Phone number',
      'Email address',
      'A property address or ZIP code',
      'The kind of work, and whether it is an insurance claim',
      'An insurance carrier, if you include one',
      'How you prefer to be contacted',
      'A description of the job, the damage, or the referral',
      'Photographs of the property or the work',
      'A company or brokerage name, on the realtor form',
      'The page address you submitted from, including campaign tags if the link had them',
    ],
  },
  {
    heading: 'Calls and email',
    paragraphs: [
      `If you call ${site.phone.display} or email ${site.email}, we keep what you tell us so we can respond and, if you hire us, so we can do the job.`,
      'The site host may keep basic technical logs, such as the browser type and the page requested, to keep the site running. We do not use those logs to build a marketing profile of you.',
    ],
  },
  {
    heading: 'How we use it',
    paragraphs: [
      'We use form submissions, photos, and messages to reply, schedule a visit, prepare an estimate, and do the work if you hire us. Job photos are used to understand what you sent and to plan or document the project, including drying, repairs, and notes you can share with an insurer.',
      'We do not use this information to sell you unrelated products, and we do not add you to a list we rent or sell.',
    ],
  },
  {
    heading: 'We do not sell personal information',
    paragraphs: [
      'We do not sell your name, phone number, email, address, or photos. We do not share them with data brokers.',
    ],
  },
  {
    heading: 'Who else sees it',
    paragraphs: [
      'People at Elite Restorations who answer the phone and run the jobs see inquiries so they can respond. Email and website vendors process the message so it reaches us. They are used to deliver it, not to advertise other companies to you.',
      'We do not send a form to an insurance company on our own. If you hire us, documentation we prepare is yours to share with your insurer. Your insurer decides what the policy covers.',
    ],
  },
  {
    heading: 'How long we keep it',
    paragraphs: [
      'We keep inquiry details long enough to respond, to do the job, and to keep ordinary business records such as estimates and invoices. You can ask us to delete an inquiry that did not become a job by emailing ' +
        site.email +
        '. We may keep records we are required to hold for taxes, insurance, or a dispute.',
    ],
  },
  {
    heading: 'Your choices',
    paragraphs: [
      'You can call instead of using a form. You can skip the photos and, on the estimate form, the email. The forms ask for a name and a phone number so we can reply.',
    ],
  },
  {
    heading: 'Changes',
    paragraphs: [
      `If we change this policy, we will update the effective date at the top of the page. This version is effective ${legalEffectiveDate}.`,
    ],
  },
];

export const termsSections: LegalSection[] = [
  {
    heading: 'This website',
    paragraphs: [
      `${site.url.replace('https://', '')} describes remodeling, restoration, and roofing from ${site.name} in the Houston area. The pages are general information about how we work. They are not a promise that a particular repair is right for your house, and sending a form is not a contract we have already accepted.`,
    ],
  },
  {
    heading: 'Requests and estimates',
    paragraphs: [
      'The contact form, the emergency form, and the realtor form send a request. Submitting one does not reserve a crew and does not create a construction contract. We confirm scope, schedule, and price with you separately, usually after we have seen the property or the photos you sent.',
      'An estimate describes the scope it was written for. If we open a wall or a roof and find something the first look could not show, such as wet framing or a damaged deck, we will tell you before the work grows past that scope.',
    ],
  },
  {
    heading: 'Emergency requests',
    paragraphs: [
      `If water is coming in or a roof is open, call ${site.phone.display}. The online form reaches the same team, and it is a request for a call back, not a guaranteed arrival time.`,
      `Office hours are ${site.hours[0].days}, ${site.hours[0].time}. ${site.hours[1].days}: ${site.hours[1].time}.`,
    ],
  },
  {
    heading: 'Insurance',
    paragraphs: [
      'We can photograph damage and write down what we dried or repaired. Your insurance company decides what your policy covers. Nothing on this site is a promise of coverage or of a claim payment.',
    ],
  },
  {
    heading: 'Photos you upload',
    paragraphs: [
      'Photos attached to a form are used to respond and to do the job. Please do not send pictures of people you do not want us to see, or documents that are not about the property. You are responsible for having the right to share what you upload. We do not sell those photos.',
    ],
  },
  {
    heading: 'The work itself',
    paragraphs: [
      'If you hire us, the agreement for the job is the one we make with you for that project. These terms cover the website and the request forms. They are not the construction contract.',
    ],
  },
  {
    heading: 'Using the site',
    paragraphs: [
      'Do not misuse the forms, try to break the site, or send a request you know is false. The articles and service pages are for general guidance. A visit, a written estimate, or a contract is how a job gets defined.',
    ],
  },
  {
    heading: 'Texas law',
    paragraphs: [
      `These terms are governed by the laws of the State of Texas. ${site.name} is located in Houston, Harris County, at ${address}.`,
      `If we change this page, we will update the effective date. This version is effective ${legalEffectiveDate}. Questions: ${site.email} or ${site.phone.display}.`,
    ],
  },
];
