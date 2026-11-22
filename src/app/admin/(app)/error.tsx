'use client';

import { AlertTriangle } from 'lucide-react';

import { Button, Card, EmptyState } from '@/components/admin/ui';

export default function AdminError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <Card>
      <EmptyState
        icon={<AlertTriangle />}
        title="Something went wrong loading this page"
        description={
          error.digest
            ? `Try again. If it keeps happening, share this reference with your developer: ${error.digest}`
            : 'Try again. If it keeps happening, check the server logs.'
        }
        action={<Button onClick={reset}>Try again</Button>}
      />
    </Card>
  );
}
