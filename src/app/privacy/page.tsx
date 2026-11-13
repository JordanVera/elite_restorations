import type { Metadata } from 'next';

import { LegalDocument } from '@/components/legal-document';
import { legalEffectiveDate, privacySections } from '@/lib/legal';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Privacy Policy',
  description:
    'What Elite Restorations collects on its Houston forms: names, phones, emails, addresses, and job photos. We do not sell this information.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <LegalDocument
      eyebrow="Privacy"
      title="Privacy policy."
      lede={`What we collect on the contact, emergency, and realtor forms, and how we use it. Effective ${legalEffectiveDate}.`}
      path="/privacy"
      sections={privacySections}
    />
  );
}
