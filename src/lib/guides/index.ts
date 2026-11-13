import type { ServiceGuide } from '@/lib/guides/types';
import { emergencyTarp, insuranceClaims, paintingDrywall, patiosDecks, siding } from '@/lib/guides/exterior-recovery';
import { laminateFlooring, tileFlooring, vinylFlooring, woodFlooring } from '@/lib/guides/floors';
import { backsplash, carpentry, countertops, tileFireplaces } from '@/lib/guides/interiors';
import { bathroomRemodeling, kitchenRemodeling } from '@/lib/guides/priority-interiors';
import { roofReplacement, roofing, waterDamage } from '@/lib/guides/priority-exterior';

export const serviceGuides: Record<string, ServiceGuide> = {
  'kitchen-remodeling': kitchenRemodeling,
  'bathroom-remodeling': bathroomRemodeling,
  backsplash,
  countertops,
  'wood-flooring': woodFlooring,
  'tile-flooring': tileFlooring,
  'vinyl-flooring': vinylFlooring,
  'laminate-flooring': laminateFlooring,
  carpentry,
  'tile-fireplaces': tileFireplaces,
  roofing,
  'roof-replacement': roofReplacement,
  'roofing-emergency-tarp-repair': emergencyTarp,
  siding,
  'patios-decks': patiosDecks,
  'water-damage-restoration': waterDamage,
  'insurance-claims': insuranceClaims,
  'painting-drywall-repair': paintingDrywall,
};
