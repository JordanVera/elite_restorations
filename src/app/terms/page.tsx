import type { Metadata } from 'next';

import { LegalDocument } from '@/components/legal-document';
import { legalEffectiveDate, termsSections } from '@/lib/legal';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Terms of Use',
  description:
    'Terms for the Elite Restorations website: estimate requests, emergency forms, photos you send, and insurance notes. Houston, Texas.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <LegalDocument
      eyebrow="Terms"
      title="Terms of use."
      lede={`Plain-language terms for this site and the request forms. Effective ${legalEffectiveDate}. The job itself is agreed separately if you hire us.`}
      path="/terms"
      sections={termsSections}
    />
  );
}
