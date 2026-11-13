import Link from 'next/link';

export function FormConsent() {
  return (
    <p className="max-w-[52ch] text-sm leading-relaxed text-muted-foreground">
      By sending this, you agree Elite Restorations may use your name, phone,
      email, address, and any photos to reply and to do the job. We do not sell
      this information.{' '}
      <Link
        href="/privacy"
        className="text-foreground underline decoration-foreground/30 underline-offset-[0.35em] hover:decoration-accent-ink"
      >
        Privacy
      </Link>
      {' · '}
      <Link
        href="/terms"
        className="text-foreground underline decoration-foreground/30 underline-offset-[0.35em] hover:decoration-accent-ink"
      >
        Terms
      </Link>
      .
    </p>
  );
}
