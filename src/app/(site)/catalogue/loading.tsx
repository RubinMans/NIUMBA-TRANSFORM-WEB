import { Container } from "@/components/ui/container";

export default function CatalogueLoading() {
  return (
    <Container className="py-10 md:py-16">
      <div className="animate-pulse space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="h-10 w-48 rounded bg-primary-soft" />
          <div className="flex gap-3">
            <div className="h-10 w-36 rounded bg-primary-soft" />
            <div className="h-10 w-36 rounded bg-primary-soft" />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <article key={i} className="space-y-3">
              <div className="aspect-square rounded-xl bg-primary-soft" />
              <div className="h-5 w-3/4 rounded bg-primary-soft" />
              <div className="h-4 w-1/2 rounded bg-primary-soft" />
              <div className="h-6 w-24 rounded bg-primary-soft" />
            </article>
          ))}
        </div>

        <div className="flex justify-center gap-2">
          <div className="h-10 w-10 rounded bg-primary-soft" />
          <div className="h-10 w-10 rounded bg-primary-soft" />
          <div className="h-10 w-10 rounded bg-primary-soft" />
          <div className="h-10 w-10 rounded bg-primary-soft" />
          <div className="h-10 w-10 rounded bg-primary-soft" />
        </div>
      </div>
    </Container>
  );
}