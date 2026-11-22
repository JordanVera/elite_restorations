import 'server-only';

import type { Prisma } from '@/server/db/generated/client';
import { db } from '@/server/db/client';

export type ActivityEntry = {
  actorType: 'ADMIN' | 'CUSTOMER' | 'SYSTEM';
  actorId?: string | null;
  actorName?: string | null;
  action: string;
  entityType: string;
  entityId: string;
  portalId?: string | null;
  metadata?: Prisma.InputJsonValue;
};

type ActivityWriter = {
  activityLog: {
    create: (args: {
      data: Prisma.ActivityLogUncheckedCreateInput;
    }) => Promise<unknown>;
  };
};

/** Pass a transaction client to record the entry atomically with the change it describes. */
export async function logActivity(
  entry: ActivityEntry,
  client: ActivityWriter = db(),
): Promise<void> {
  await client.activityLog.create({
    data: {
      actorType: entry.actorType,
      actorId: entry.actorId ?? null,
      actorName: entry.actorName ?? null,
      action: entry.action,
      entityType: entry.entityType,
      entityId: entry.entityId,
      portalId: entry.portalId ?? null,
      metadata: entry.metadata,
    },
  });
}
