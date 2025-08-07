export default function BroadcastsCampaignsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Campaigns</h1>
        <p className="text-muted-foreground">
          View and manage all your email and SMS campaigns.
        </p>
      </div>
      
      <div className="grid gap-6">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Campaign Management</h2>
            <p className="text-muted-foreground">
              This page will display all your campaigns with their status, performance metrics, and management options.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 