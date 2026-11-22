import Image from 'next/image';
import { redirect } from 'next/navigation';

import { LoginForm } from '@/components/admin/login-form';
import { safeAdminRedirect } from '@/server/auth/policy';
import { getAdmin } from '@/server/auth/session';
import { databaseConfigured } from '@/server/db/client';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Sign in' };

export default async function AdminLoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams;
  const configured = databaseConfigured();
  if (configured && (await getAdmin())) redirect(safeAdminRedirect(next));

  return (
    <div className="grid min-h-dvh lg:grid-cols-[1fr_1.1fr]">
      <div className="relative hidden overflow-hidden bg-[#111] lg:block">
        <Image
          src="/images/projects/kitchens/coffered-ceiling-island.jpg"
          alt=""
          fill
          sizes="50vw"
          className="object-cover opacity-45"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />
        <div className="relative flex h-full flex-col justify-between p-10 text-white">
          <Image src="/images/logo/logo-white.png" alt="Elite Restorations" width={176} height={80} className="h-auto w-40" />
          <div className="max-w-md">
            <p className="font-display text-4xl leading-tight">Project selections, kept in one place.</p>
            <p className="mt-3 text-sm text-white/70">
              Customers, quotes, material portals, and reviews for the Elite Restorations team.
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <Image
            src="/images/logo/logo-black.png"
            alt="Elite Restorations"
            width={160}
            height={72}
            className="mb-10 h-auto w-36 lg:hidden"
          />
          <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
          <p className="mt-1 text-sm text-muted-foreground">Staff accounts only. Ask an administrator for access.</p>
          <div className="mt-8">
            <LoginForm next={next ?? ''} disabled={!configured} />
          </div>
        </div>
      </div>
    </div>
  );
}
