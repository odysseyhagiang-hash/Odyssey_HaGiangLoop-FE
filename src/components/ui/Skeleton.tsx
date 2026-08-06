import { cn } from '../../lib/utils';

export function Skeleton({ className }: { className?: string; }) {
  return <div aria-hidden="true" className={cn('shimmer rounded-2xl bg-ink/5', className)} />;
}

export function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-4xl border border-ink/8 bg-white p-4">
      <Skeleton className="aspect-[4/3] w-full rounded-3xl" />
      <div className="space-y-3 p-4">
        <Skeleton className="h-3 w-24 rounded-full" />
        <Skeleton className="h-6 w-3/4 rounded-full" />
        <Skeleton className="h-3 w-full rounded-full" />
        <Skeleton className="h-3 w-2/3 rounded-full" />
      </div>
    </div>);

}

export function GridSkeleton({ count = 3 }: { count?: number; }) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
      {Array.from({ length: count }).map((_, index) =>
        <CardSkeleton key={index} />
      )}
    </div>);

}