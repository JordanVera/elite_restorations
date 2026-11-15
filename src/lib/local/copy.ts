import type { AreaProfile } from '@/lib/local/areas';
import { briefToTrade } from '@/lib/local/brief';
import { assemble, type LocalCopy, type TradeSpec } from '@/lib/local/engine';
import { bathroomBrief } from '@/lib/local/briefs/bathroom';
import { backsplashBrief } from '@/lib/local/briefs/backsplash';
import { countertopsBrief } from '@/lib/local/briefs/countertops';
import { woodBrief, tileFloorBrief } from '@/lib/local/briefs/floors-a';
import { vinylBrief, laminateBrief } from '@/lib/local/briefs/floors-b';
import { carpentryBrief, fireplaceBrief } from '@/lib/local/briefs/millwork';
import { roofingBrief, replacementBrief } from '@/lib/local/briefs/roofs';
import { tarpBrief, sidingBrief } from '@/lib/local/briefs/exterior-more';
import { patioBrief, waterBrief } from '@/lib/local/briefs/water-patio';
import { insuranceBrief, paintBrief } from '@/lib/local/briefs/claims-paint';
import { kitchenTrade } from '@/lib/local/spec-kitchen';

const trades: readonly TradeSpec[] = [
  kitchenTrade,
  briefToTrade(bathroomBrief),
  briefToTrade(backsplashBrief),
  briefToTrade(countertopsBrief),
  briefToTrade(woodBrief),
  briefToTrade(tileFloorBrief),
  briefToTrade(vinylBrief),
  briefToTrade(laminateBrief),
  briefToTrade(carpentryBrief),
  briefToTrade(fireplaceBrief),
  briefToTrade(roofingBrief),
  briefToTrade(replacementBrief),
  briefToTrade(tarpBrief),
  briefToTrade(sidingBrief),
  briefToTrade(patioBrief),
  briefToTrade(waterBrief),
  briefToTrade(insuranceBrief),
  briefToTrade(paintBrief),
];

const bySlug = new Map(trades.map((trade) => [trade.slug, trade]));

export function buildLocalCopy(
  service: { slug: string; name: string; emergency?: boolean },
  area: AreaProfile,
): LocalCopy {
  const trade = bySlug.get(service.slug);
  if (!trade) throw new Error(`No local copy for ${service.slug}`);
  if (trade.emergency && !service.emergency) {
    throw new Error(`${service.slug} copy is marked emergency but the service is not`);
  }
  return assemble(area, trade);
}

export const costGuideForService: Record<string, { href: string; label: string }> = {
  'kitchen-remodeling': {
    href: '/kitchen-remodel-cost-houston',
    label: 'Kitchen remodel cost in Houston',
  },
  backsplash: {
    href: '/kitchen-remodel-cost-houston',
    label: 'Kitchen remodel cost in Houston',
  },
  countertops: {
    href: '/kitchen-remodel-cost-houston',
    label: 'Kitchen remodel cost in Houston',
  },
  'bathroom-remodeling': {
    href: '/bathroom-remodel-cost-houston',
    label: 'Bathroom remodel cost in Houston',
  },
  roofing: {
    href: '/roof-replacement-cost-houston',
    label: 'Roof replacement cost in Houston',
  },
  'roof-replacement': {
    href: '/roof-replacement-cost-houston',
    label: 'Roof replacement cost in Houston',
  },
  'roofing-emergency-tarp-repair': {
    href: '/roof-replacement-cost-houston',
    label: 'Roof replacement cost in Houston',
  },
};
