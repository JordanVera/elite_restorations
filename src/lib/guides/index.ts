import type { ServiceGuide } from '@/lib/guides/types';
import { emergencyTarp, insuranceClaims, paintingDrywall, patiosDecks, siding } from '@/lib/guides/exterior-recovery';
import { laminateFlooring, tileFlooring, vinylFlooring, woodFlooring } from '@/lib/guides/floors';
import { commercialGuide } from '@/lib/guides/hub-commercial';
import { deckGuide } from '@/lib/guides/hub-decks';
import { fenceGuide } from '@/lib/guides/hub-fence';
import { gazeboGuide } from '@/lib/guides/hub-gazebos';
import { gutterGuide } from '@/lib/guides/hub-gutters';
import { patioGuide } from '@/lib/guides/hub-patios';
import { emergencyBoardUpGuide } from '@/lib/guides/hub-board-up';
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
  'emergency-board-up': emergencyBoardUpGuide,
  'fence-installation-repair': fenceGuide,
  gutters: gutterGuide,
  patios: patioGuide,
  gazebos: gazeboGuide,
  decks: deckGuide,
  'commercial-storm-restoration': commercialGuide,
};
