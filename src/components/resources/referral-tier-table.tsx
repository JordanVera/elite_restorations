import { referralTiers } from '@/lib/referral-tiers';

export function ReferralTierTable() {
  return (
    <div>
      <div className="hidden md:block">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">
            Referral fees by annual referred revenue. Placeholder figures.
          </caption>
          <thead>
            <tr className="border-b border-border">
              <th scope="col" className="eyebrow py-4 pr-6 font-medium text-muted-foreground">
                Annual referred revenue
              </th>
              <th scope="col" className="eyebrow py-4 pr-6 font-medium text-muted-foreground">
                Referral fee
              </th>
              <th scope="col" className="eyebrow py-4 font-medium text-muted-foreground">
                Perks
              </th>
            </tr>
          </thead>
          <tbody>
            {referralTiers.map((tier) => (
              <tr key={tier.revenue} className="border-b border-border">
                <th scope="row" className="py-6 pr-6 font-normal">
                  {tier.revenue}
                </th>
                <td className="py-6 pr-6 font-display text-3xl text-accent-ink">{tier.fee}</td>
                <td className="py-6 text-muted-foreground">{tier.perks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="grid gap-px bg-border md:hidden">
        {referralTiers.map((tier) => (
          <li key={tier.revenue} className="bg-background p-6">
            <p className="eyebrow text-muted-foreground">Annual referred revenue</p>
            <p className="mt-3 text-lg">{tier.revenue}</p>
            <p className="eyebrow mt-6 text-muted-foreground">Referral fee</p>
            <p className="font-display mt-2 text-4xl text-accent-ink">{tier.fee}</p>
            <p className="eyebrow mt-6 text-muted-foreground">Perks</p>
            <p className="mt-2 text-muted-foreground">{tier.perks}</p>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-sm text-muted-foreground">
        Placeholder figures. Fees and perks are edited in the referral tier list and can change
        before a partnership is confirmed.
      </p>
    </div>
  );
}
