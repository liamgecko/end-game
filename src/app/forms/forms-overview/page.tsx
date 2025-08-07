export default function FormsOverviewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Forms Overview</h1>
        <p className="text-muted-foreground">
          Manage and view all your created forms.
        </p>
      </div>
      
      <div className="grid gap-6">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">My Forms</h2>
            <p className="text-muted-foreground">
              This page will display a list of all your forms with their status and performance metrics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 