'use client';

import { LoaderCircle } from 'lucide-react';
import { useActionState } from 'react';

import { Button, Field, Notice, TextInput } from '@/components/admin/ui';
import { loginAction, type LoginState } from '@/server/auth/actions';

export function LoginForm({ next, disabled }: { next: string; disabled: boolean }) {
  const [state, action, pending] = useActionState<LoginState, FormData>(loginAction, {});

  return (
    <form action={action} className="grid gap-5" noValidate>
      {disabled ? (
        <Notice tone="warning" title="Database not configured">
          Set DATABASE_URL and run the migrations before signing in. See docs/admin-portal.md.
        </Notice>
      ) : null}
      {state.error ? <Notice tone="danger">{state.error}</Notice> : null}
      <input type="hidden" name="next" value={next} />
      <Field label="Email" htmlFor="email">
        <TextInput
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          required
          defaultValue={state.email}
          disabled={disabled}
          className="h-11"
        />
      </Field>
      <Field label="Password" htmlFor="password">
        <TextInput
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          disabled={disabled}
          className="h-11"
        />
      </Field>
      <Button type="submit" size="lg" disabled={pending || disabled} className="mt-1 w-full">
        {pending ? <LoaderCircle className="animate-spin" /> : null}
        {pending ? 'Signing in' : 'Sign in'}
      </Button>
    </form>
  );
}
