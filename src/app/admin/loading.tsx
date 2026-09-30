import { Container } from "@/components/ui/container";

export default function AdminLoading() {
  return (
    <div className="flex h-screen bg-surface-subtle">
      {/* Sidebar skeleton */}
      <aside className="hidden w-64 shrink-0 border-r border-border-soft bg-surface lg:block">
        <Container className="py-6">
          <div className="animate-pulse space-y-4">
            <div className="h-10 w-3/4 rounded bg-primary-soft" />
            <nav className="space-y-2">
              <div className="h-10 w-full rounded bg-primary-soft" />
              <div className="h-10 w-full rounded bg-primary-soft" />
              <div className="h-10 w-full rounded bg-primary-soft" />
              <div className="h-10 w-full rounded bg-primary-soft" />
              <div className="h-10 w-full rounded bg-primary-soft" />
              <div className="h-10 w-full rounded bg-primary-soft" />
              <div className="h-10 w-full rounded bg-primary-soft" />
              <div className="h-10 w-full rounded bg-primary-soft" />
            </nav>
          </div>
        </Container>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <header className="border-b border-border-soft bg-surface sticky top-0 z-10">
          <Container className="flex h-16 items-center justify-between">
            <div className="animate-pulse">
              <div className="h-6 w-32 rounded bg-primary-soft" />
            </div>
            <div className="flex items-center gap-4">
              <div className="h-8 w-8 rounded-full bg-primary-soft" />
              <div className="h-6 w-20 rounded bg-primary-soft" />
            </div>
          </Container>
        </header>

        <Container className="py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-48 rounded bg-primary-soft" />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="p-4 rounded-xl bg-surface border border-border-soft">
                <div className="h-4 w-1/3 rounded bg-primary-soft" />
                <div className="mt-2 h-8 w-1/2 rounded bg-primary-soft" />
              </div>
              <div className="p-4 rounded-xl bg-surface border border-border-soft">
                <div className="h-4 w-1/3 rounded bg-primary-soft" />
                <div className="mt-2 h-8 w-1/2 rounded bg-primary-soft" />
              </div>
              <div className="p-4 rounded-xl bg-surface border border-border-soft">
                <div className="h-4 w-1/3 rounded bg-primary-soft" />
                <div className="mt-2 h-8 w-1/2 rounded bg-primary-soft" />
              </div>
              <div className="p-4 rounded-xl bg-surface border border-border-soft">
                <div className="h-4 w-1/3 rounded bg-primary-soft" />
                <div className="mt-2 h-8 w-1/2 rounded bg-primary-soft" />
              </div>
            </div>
            <div className="rounded-xl bg-surface border border-border-soft p-6">
              <div className="flex items-center justify-between">
                <div className="h-6 w-40 rounded bg-primary-soft" />
                <div className="h-10 w-24 rounded bg-primary-soft" />
              </div>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border-soft">
                      <th className="text-left py-2"><div className="h-4 w-20 rounded bg-primary-soft" /></th>
                      <th className="text-left py-2"><div className="h-4 w-20 rounded bg-primary-soft" /></th>
                      <th className="text-left py-2"><div className="h-4 w-20 rounded bg-primary-soft" /></th>
                      <th className="text-left py-2"><div className="h-4 w-20 rounded bg-primary-soft" /></th>
                      <th className="text-left py-2"><div className="h-4 w-20 rounded bg-primary-soft" /></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border-soft">
                      <td className="py-3"><div className="h-4 w-24 rounded bg-primary-soft" /></td>
                      <td className="py-3"><div className="h-4 w-20 rounded bg-primary-soft" /></td>
                      <td className="py-3"><div className="h-4 w-16 rounded bg-primary-soft" /></td>
                      <td className="py-3"><div className="h-4 w-20 rounded bg-primary-soft" /></td>
                      <td className="py-3"><div className="h-8 w-20 rounded bg-primary-soft" /></td>
                    </tr>
                    <tr className="border-b border-border-soft">
                      <td className="py-3"><div className="h-4 w-24 rounded bg-primary-soft" /></td>
                      <td className="py-3"><div className="h-4 w-20 rounded bg-primary-soft" /></td>
                      <td className="py-3"><div className="h-4 w-16 rounded bg-primary-soft" /></td>
                      <td className="py-3"><div className="h-4 w-20 rounded bg-primary-soft" /></td>
                      <td className="py-3"><div className="h-8 w-20 rounded bg-primary-soft" /></td>
                    </tr>
                    <tr className="border-b border-border-soft">
                      <td className="py-3"><div className="h-4 w-24 rounded bg-primary-soft" /></td>
                      <td className="py-3"><div className="h-4 w-20 rounded bg-primary-soft" /></td>
                      <td className="py-3"><div className="h-4 w-16 rounded bg-primary-soft" /></td>
                      <td className="py-3"><div className="h-4 w-20 rounded bg-primary-soft" /></td>
                      <td className="py-3"><div className="h-8 w-20 rounded bg-primary-soft" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}