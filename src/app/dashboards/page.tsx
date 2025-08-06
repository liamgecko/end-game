export default function DashboardsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboards</h1>
        <p className="text-muted-foreground">
          View analytics and performance metrics.
        </p>
      </div>
      
      <div className="rounded-lg border">
        <div className="p-6">
          <h3 className="text-lg font-semibold">Analytics Dashboard</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Your analytics and reports will appear here.
          </p>
        </div>
      </div>
    </div>
  );
} 