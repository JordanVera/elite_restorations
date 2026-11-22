import { CheckCircle2, CircleAlert, CircleDashed, ExternalLink } from 'lucide-react';

import { ActionButton } from '@/components/admin/action-button';
import { Badge, Button, Card, CardHeader, Notice, PageHeader } from '@/components/admin/ui';
import { formatDateTime, relativeTime } from '@/lib/activity-labels';
import {
  checkJobberSchemaAction,
  disconnectJobberAction,
  purgeMockDataAction,
  syncJobberAction,
} from '@/server/admin/integration-actions';
import { requireAdmin } from '@/server/auth/session';
import { db } from '@/server/db/client';
import { jobberCredentialsReady, jobberGraphqlVersion, jobberRedirectUri, jobberWebhooksEnabled } from '@/server/jobber/config';
import { jobberMode } from '@/server/jobber/mode';
import { readConnectionSummary } from '@/server/jobber/token-store';
import { encryptionConfigured } from '@/server/security/crypto';

export const metadata = { title: 'Integrations' };
export const maxDuration = 60;

const CALLBACK_MESSAGES: Record<string, { tone: 'success' | 'danger' | 'warning'; text: string }> = {
  connected: { tone: 'success', text: 'Jobber is connected. Run a sync to import customers and quotes.' },
  denied: { tone: 'warning', text: 'Jobber access was not granted.' },
  expired: { tone: 'warning', text: 'The connect request expired. Start it again and approve within 10 minutes.' },
  'store-error': { tone: 'danger', text: 'Jobber approved access, but the tokens could not be saved. Check DATABASE_URL and APP_ENCRYPTION_KEY.' },
  'exchange-error': { tone: 'danger', text: 'Jobber approved access, but the token exchange failed. Try connecting again.' },
};

export default async function IntegrationsPage({ searchParams }: { searchParams: Promise<{ jobber?: string }> }) {
  await requireAdmin('manage_integrations');
  const { jobber } = await searchParams;
  const mode = jobberMode();
  const [connection, lastRun, mockCount, realCount] = await Promise.all([
    readConnectionSummary(),
    db().jobberSyncRun.findFirst({ orderBy: { startedAt: 'desc' } }),
    db().jobberClient.count({ where: { source: 'MOCK' } }),
    db().jobberClient.count({ where: { source: 'JOBBER' } }),
  ]);
  const credentials = jobberCredentialsReady();
  const encryption = encryptionConfigured();
  const callback = jobber ? CALLBACK_MESSAGES[jobber] : undefined;

  const status =
    mode === 'mock'
      ? { label: 'Demo mode', tone: 'warning' as const, icon: CircleDashed }
      : !connection || connection.status === 'DISCONNECTED'
        ? { label: 'Not connected', tone: 'neutral' as const, icon: CircleDashed }
        : connection.status === 'NEEDS_RECONNECT'
          ? { label: 'Needs reconnect', tone: 'danger' as const, icon: CircleAlert }
          : { label: 'Connected', tone: 'success' as const, icon: CheckCircle2 };

  return (
    <>
      <PageHeader
        eyebrow="Settings"
        title="Integrations"
        description="Jobber is the source of truth for customers and quotes. This site reads them and never changes quotes, prices, or line items."
      />
      {callback ? (
        <Notice tone={callback.tone} className="mb-6">
          {callback.text}
        </Notice>
      ) : null}

      <Card>
        <CardHeader
          title={
            <span className="flex items-center gap-2">
              Jobber
              <Badge tone={status.tone}>
                <status.icon className="size-3" />
                {status.label}
              </Badge>
            </span>
          }
          description={`GraphQL API version ${jobberGraphqlVersion()}`}
        />
        <div className="grid gap-6 p-5 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-4">
            {mode === 'mock' ? (
              <Notice tone="warning" title="Demo mode: no calls are made to Jobber">
                Sync loads invented customers and quotes so the portal workflow can be tried end to end. Set{' '}
                <code>JOBBER_MODE=live</code> with Jobber credentials to use the real account.
              </Notice>
            ) : null}
            {mode === 'live' && !credentials ? (
              <Notice tone="danger" title="Jobber credentials missing">
                Set JOBBER_CLIENT_ID and JOBBER_CLIENT_SECRET.
              </Notice>
            ) : null}
            {!encryption ? (
              <Notice tone="danger" title="Encryption key missing">
                Set APP_ENCRYPTION_KEY (32 random bytes, base64) before connecting. Tokens are encrypted with it.
              </Notice>
            ) : null}
            {connection?.status === 'NEEDS_RECONNECT' ? (
              <Notice tone="danger" title="Jobber rejected the stored refresh token">
                Reconnect to restore syncing and website lead intake. {connection.lastError}
              </Notice>
            ) : null}

            <dl className="grid grid-cols-[9rem_1fr] gap-x-4 gap-y-2 text-sm">
              <dt className="text-muted-foreground">Account</dt>
              <dd>{connection?.accountName ?? '—'}</dd>
              <dt className="text-muted-foreground">Connected</dt>
              <dd>{connection ? formatDateTime(connection.connectedAt) : '—'}</dd>
              <dt className="text-muted-foreground">Callback URL</dt>
              <dd className="break-all">{jobberRedirectUri()}</dd>
              <dt className="text-muted-foreground">Webhooks</dt>
              <dd>{jobberWebhooksEnabled() ? 'Enabled at /api/jobber/webhooks' : 'Off (JOBBER_WEBHOOK_ENABLED)'}</dd>
              <dt className="text-muted-foreground">Records</dt>
              <dd>
                {realCount} from Jobber{mockCount ? ` · ${mockCount} demo` : ''}
              </dd>
            </dl>

            {mode === 'live' ? (
              <div className="flex flex-wrap gap-2 pt-1">
                <form action="/api/jobber/connect" method="get">
                  <Button type="submit" variant="primary" disabled={!credentials || !encryption}>
                    {connection && connection.status !== 'DISCONNECTED' ? 'Reconnect Jobber' : 'Connect Jobber'}
                    <ExternalLink />
                  </Button>
                </form>
                {connection ? (
                  <ActionButton
                    action={disconnectJobberAction}
                    variant="danger-outline"
                    confirm={{
                      title: 'Disconnect Jobber?',
                      description:
                        'This deletes the stored tokens. Syncing and website lead intake into Jobber stop until you connect again. To revoke the app completely, also remove it in Jobber under Settings > Apps.',
                      confirmLabel: 'Disconnect',
                      danger: true,
                    }}
                  >
                    Disconnect
                  </ActionButton>
                ) : null}
              </div>
            ) : null}
            <p className="text-[0.8rem] text-muted-foreground">
              Required scopes on the Jobber app: read clients, read quotes, plus the existing client and request write
              scopes used by the estimate form. Adding a scope requires reconnecting.
            </p>
          </div>

          <div className="space-y-4 rounded-[10px] bg-surface-2/60 p-4">
            <div>
              <p className="font-medium">Sync</p>
              <p className="text-sm text-muted-foreground">
                Imports customers, then quotes with line items. Large accounts sync in batches; click again to continue.
              </p>
            </div>
            {lastRun ? (
              <div className="text-sm">
                <p>
                  Last run{' '}
                  <Badge
                    tone={
                      lastRun.status === 'SUCCEEDED' ? 'success' : lastRun.status === 'FAILED' ? 'danger' : 'warning'
                    }
                  >
                    {lastRun.status.toLowerCase()}
                  </Badge>{' '}
                  {lastRun.source === 'MOCK' ? '(demo data)' : ''}
                </p>
                <p className="mt-1 text-muted-foreground">
                  {relativeTime(lastRun.finishedAt ?? lastRun.startedAt)} · {lastRun.clientsSynced} customers ·{' '}
                  {lastRun.quotesSynced} quotes
                </p>
                {lastRun.error ? <p className="mt-1 text-accent-ink">{lastRun.error}</p> : null}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No sync has run yet.</p>
            )}
            <div className="flex flex-wrap gap-2">
              <ActionButton
                action={syncJobberAction}
                variant="primary"
                pendingLabel="Syncing"
                disabled={mode === 'live' && (!connection || connection.status !== 'CONNECTED')}
              >
                {mode === 'mock' ? 'Load demo data' : lastRun?.status === 'PARTIAL' ? 'Continue sync' : 'Sync now'}
              </ActionButton>
              {mode === 'live' && connection?.status === 'CONNECTED' ? (
                <ActionButton action={checkJobberSchemaAction} pendingLabel="Checking">
                  Check schema
                </ActionButton>
              ) : null}
            </div>
            {mockCount > 0 ? (
              <ActionButton
                action={purgeMockDataAction}
                variant="ghost"
                size="sm"
                confirm={{
                  title: 'Remove demo data?',
                  description:
                    'Deletes every demo customer and quote, and any portals and selections created on them. Records from Jobber are not affected.',
                  confirmLabel: 'Remove demo data',
                  danger: true,
                }}
              >
                Remove demo data
              </ActionButton>
            ) : null}
          </div>
        </div>
      </Card>
    </>
  );
}
