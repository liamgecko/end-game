export default function CallsOverviewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Call Overview</h1>
        <p className="text-muted-foreground">
          View call performance metrics and analytics.
        </p>
      </div>
      
      <div className="grid gap-6">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Call Analytics</h2>
            <p className="text-muted-foreground">
              This page will display call performance metrics, success rates, and key analytics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 