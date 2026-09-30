import { Container } from "@/components/ui/container";

export default function SiteLoading() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-border-soft bg-surface">
        <Container className="flex h-16 items-center justify-between">
          <div className="h-10 w-40 animate-pulse rounded-lg bg-primary-soft" />
          <nav className="flex items-center gap-6">
            <div className="h-6 w-24 animate-pulse rounded bg-primary-soft" />
            <div className="h-6 w-24 animate-pulse rounded bg-primary-soft" />
            <div className="h-6 w-24 animate-pulse rounded bg-primary-soft" />
            <div className="h-6 w-24 animate-pulse rounded bg-primary-soft" />
            <div className="h-6 w-24 animate-pulse rounded bg-primary-soft" />
          </nav>
        </Container>
      </header>
      <main className="flex-1">
        <Container className="py-10">
          <div className="space-y-8">
            <div className="animate-pulse space-y-4">
              <div className="h-8 w-3/12 rounded bg-primary-soft" />
              <div className="grid gap-6 md:grid-cols-3">
                <div className="aspect-square rounded-xl bg-primary-soft" />
                <div className="aspect-square rounded-xl bg-primary-soft" />
                <div className="aspect-square rounded-xl bg-primary-soft" />
              </div>
            </div>
            <div className="animate-pulse space-y-4">
              <div className="h-8 w-2/12 rounded bg-primary-soft" />
              <div className="grid gap-6 md:grid-cols-4">
                <div className="space-y-3">
                  <div className="aspect-square rounded-xl bg-primary-soft" />
                  <div className="h-4 w-3/4 rounded bg-primary-soft" />
                  <div className="h-4 w-1/2 rounded bg-primary-soft" />
                </div>
                <div className="space-y-3">
                  <div className="aspect-square rounded-xl bg-primary-soft" />
                  <div className="h-4 w-3/4 rounded bg-primary-soft" />
                  <div className="h-4 w-1/2 rounded bg-primary-soft" />
                </div>
                <div className="space-y-3">
                  <div className="aspect-square rounded-xl bg-primary-soft" />
                  <div className="h-4 w-3/4 rounded bg-primary-soft" />
                  <div className="h-4 w-1/2 rounded bg-primary-soft" />
                </div>
                <div className="space-y-3">
                  <div className="aspect-square rounded-xl bg-primary-soft" />
                  <div className="h-4 w-3/4 rounded bg-primary-soft" />
                  <div className="h-4 w-1/2 rounded bg-primary-soft" />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </main>
      <footer className="border-t border-border-soft bg-surface-subtle">
        <Container className="py-8">
          <div className="animate-pulse grid gap-8 md:grid-cols-4">
            <div className="space-y-3 md:col-span-2">
              <div className="h-10 w-40 rounded bg-primary-soft" />
              <div className="h-4 w-3/4 rounded bg-primary-soft" />
              <div className="h-4 w-1/2 rounded bg-primary-soft" />
            </div>
            <div className="space-y-3">
              <div className="h-4 w-1/2 rounded bg-primary-soft" />
              <div className="h-4 w-2/3 rounded bg-primary-soft" />
              <div className="h-4 w-3/4 rounded bg-primary-soft" />
              <div className="h-4 w-1/2 rounded bg-primary-soft" />
            </div>
            <div className="space-y-3">
              <div className="h-4 w-1/2 rounded bg-primary-soft" />
              <div className="h-4 w-3/4 rounded bg-primary-soft" />
              <div className="h-4 w-1/2 rounded bg-primary-soft" />
              <div className="h-4 w-2/3 rounded bg-primary-soft" />
            </div>
          </div>
          <div className="mt-8 border-t border-border-soft pt-6 animate-pulse">
            <div className="flex justify-center">
              <div className="h-3 w-24 rounded bg-primary-soft" />
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}