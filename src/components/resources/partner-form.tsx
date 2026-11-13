import { LeadForm } from '@/components/lead-form';

export function PartnerForm() {
  return (
    <LeadForm
      intent="partner"
      idPrefix="partner"
      submitLabel="Become a partner"
      showPhotos={false}
    />
  );
}
