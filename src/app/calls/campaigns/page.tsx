export default function CallsCampaignsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Call Campaigns</h1>
        <p className="text-muted-foreground">
          Manage and monitor your call campaigns.
        </p>
      </div>
      
      <div className="grid gap-6">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Campaign Management</h2>
            <p className="text-muted-foreground">
              This page will allow you to create, manage, and monitor call campaigns with target lists and scheduling.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 