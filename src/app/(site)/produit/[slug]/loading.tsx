import { Container } from "@/components/ui/container";

export default function ProduitLoading() {
  return (
    <Container className="py-10 md:py-16">
      <div className="animate-pulse space-y-8">
        <div className="h-4 w-40 rounded bg-primary-soft" />
        <div className="h-8 w-64 rounded bg-primary-soft" />

        <div className="grid gap-8 md:grid-cols-2">
          <div className="aspect-square rounded-2xl bg-primary-soft" />
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="h-6 w-24 rounded-full bg-primary-soft" />
              <div className="h-6 w-24 rounded-full bg-primary-soft" />
              <div className="h-6 w-24 rounded-full bg-primary-soft" />
              <div className="h-6 w-24 rounded-full bg-primary-soft" />
            </div>
            <div className="h-6 w-48 rounded bg-primary-soft" />
            <div className="space-y-3">
              <div className="h-4 w-3/4 rounded bg-primary-soft" />
              <div className="h-4 w-1/2 rounded bg-primary-soft" />
              <div className="h-4 w-2/3 rounded bg-primary-soft" />
            </div>
            <div className="h-12 w-40 rounded-full bg-primary-soft" />
          </div>
        </div>

        <div className="rounded-2xl border border-border-soft bg-surface p-6 md:p-8">
          <div className="space-y-4">
            <div className="h-6 w-24 rounded bg-primary-soft" />
            <div className="space-y-3">
              <div className="h-4 w-full rounded bg-primary-soft" />
              <div className="h-4 w-full rounded bg-primary-soft" />
              <div className="h-4 w-3/4 rounded bg-primary-soft" />
            </div>
            <div className="h-6 w-24 rounded bg-primary-soft" />
            <div className="space-y-3">
              <div className="h-4 w-full rounded bg-primary-soft" />
              <div className="h-4 w-full rounded bg-primary-soft" />
              <div className="h-4 w-3/4 rounded bg-primary-soft" />
            </div>
            <div className="h-6 w-24 rounded bg-primary-soft" />
            <div className="space-y-3">
              <div className="h-4 w-full rounded bg-primary-soft" />
              <div className="h-4 w-full rounded bg-primary-soft" />
              <div className="h-4 w-3/4 rounded bg-primary-soft" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border-soft bg-surface p-6 md:p-8">
          <div className="space-y-4">
            <div className="h-6 w-24 rounded bg-primary-soft" />
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <div className="h-4 w-full rounded bg-primary-soft" />
                <div className="h-4 w-full rounded bg-primary-soft" />
              </div>
              <div className="space-y-3">
                <div className="h-4 w-full rounded bg-primary-soft" />
                <div className="h-4 w-full rounded bg-primary-soft" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}