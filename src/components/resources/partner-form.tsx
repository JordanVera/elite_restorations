import { LeadForm } from '@/components/lead-form';

export function PartnerForm() {
  return (
    <LeadForm
      intent="partner"
      idPrefix="partner"
      submitLabel="Join the Realtor program"
      showPhotos={false}
    />
  );
}
