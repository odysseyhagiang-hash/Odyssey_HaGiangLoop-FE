import { Skeleton } from '../ui/Skeleton';
import { Container } from '../ui/Section';

/** Suspense fallback shown while a lazily loaded route chunk resolves. */
export function RouteLoader() {
  return (
    <main className="w-full bg-canvas pb-24 pt-40" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading page</span>
      <Container>
        <Skeleton className="h-[38vh] w-full rounded-5xl" />
        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-4">
            <Skeleton className="h-3 w-28 rounded-full" />
            <Skeleton className="h-10 w-full rounded-full" />
            <Skeleton className="h-10 w-2/3 rounded-full" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-3 w-full rounded-full" />
            <Skeleton className="h-3 w-11/12 rounded-full" />
            <Skeleton className="h-3 w-4/5 rounded-full" />
            <Skeleton className="h-3 w-3/5 rounded-full" />
          </div>
        </div>
      </Container>
    </main>);

}