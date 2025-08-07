export default function CallsScriptsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Call Scripts</h1>
        <p className="text-muted-foreground">
          Create and manage scripts for your call campaigns.
        </p>
      </div>
      
      <div className="grid gap-6">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Script Management</h2>
            <p className="text-muted-foreground">
              This page will allow you to create, edit, and manage call scripts for different campaign types.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 