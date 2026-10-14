import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Renovation opportunities",
  robots: { index: false, follow: false },
};

const clerkConfigured = Boolean(process.env.CLERK_SECRET_KEY && process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const body = (
    <div className="min-h-dvh bg-background text-foreground">
      <header className="border-b border-border px-6 py-5">
        <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Elite Restorations</p>
        <div className="mt-2 flex items-end justify-between gap-4">
          <h1 className="font-display text-3xl">Renovation opportunities</h1>
          <a href="/" className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Public site
          </a>
        </div>
      </header>
      <main className="px-6 py-8">{children}</main>
    </div>
  );
  if (!clerkConfigured) return body;
  return <ClerkProvider>{body}</ClerkProvider>;
}
