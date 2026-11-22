import { Card, Skeleton } from '@/components/admin/ui';

export default function AdminLoading() {
  return (
    <div aria-busy="true" aria-label="Loading">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="mt-3 h-4 w-96 max-w-full" />
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }, (_, i) => (
          <Card key={i} className="p-5">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="mt-4 h-8 w-16" />
          </Card>
        ))}
      </div>
      <Card className="mt-6 p-5">
        {Array.from({ length: 5 }, (_, i) => (
          <Skeleton key={i} className="mb-3 h-10 w-full last:mb-0" />
        ))}
      </Card>
    </div>
  );
}
