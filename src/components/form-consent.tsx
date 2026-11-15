import Link from 'next/link';

export function FormConsent({ locale = 'en' }: { locale?: 'en' | 'es' }) {
  const es = locale === 'es';
  return (
    <p className="max-w-[52ch] text-sm leading-relaxed text-muted-foreground">
      {es
        ? 'Al enviar esto, usted acepta que Elite Restorations use su nombre, teléfono, correo, dirección y las fotos para responderle y hacer el trabajo. No vendemos esta información.'
        : 'By sending this, you agree Elite Restorations may use your name, phone, email, address, and any photos to reply and to do the job. We do not sell this information.'}{' '}
      <Link
        href="/privacy"
        className="text-foreground underline decoration-foreground/30 underline-offset-[0.35em] hover:decoration-accent-ink"
      >
        {es ? 'Privacidad' : 'Privacy'}
      </Link>
      {' · '}
      <Link
        href="/terms"
        className="text-foreground underline decoration-foreground/30 underline-offset-[0.35em] hover:decoration-accent-ink"
      >
        {es ? 'Términos' : 'Terms'}
      </Link>
      .
    </p>
  );
}
