import { SignIn } from "@clerk/nextjs";

export default function AdminSignInPage() {
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    return (
      <section className="max-w-xl">
        <h2 className="font-display text-4xl">Sign-in is not configured</h2>
        <p className="mt-4 text-muted-foreground">
          Add Clerk keys and invite staff, or on localhost set OPPORTUNITY_DEV_AUTH to a staff email while Clerk is pending. Production ignores that development bypass.
        </p>
      </section>
    );
  }
  return <SignIn path="/admin/sign-in" routing="path" />;
}
