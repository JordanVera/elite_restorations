/**
 * Partner referral tiers. Edit the numbers and perks here.
 * The realtor page and the partner form volume options both read this list.
 */

export type ReferralTier = {
  /** Annual referred revenue band. */
  revenue: string;
  /** Referral fee for that band. */
  fee: string;
  /** What the partner receives at this level. */
  perks: string;
};

export const referralTiers: ReferralTier[] = [
  {
    revenue: '$0 – $50,000',
    fee: '3%',
    perks: 'Standard support',
  },
  {
    revenue: '$50,000 – $150,000',
    fee: '5%',
    perks: 'Priority scheduling',
  },
  {
    revenue: '$150,000 – $300,000',
    fee: '7%',
    perks: 'Dedicated project manager',
  },
  {
    revenue: '$300,000+',
    fee: '8% + priority status',
    perks: 'Highest priority + custom rates',
  },
];
