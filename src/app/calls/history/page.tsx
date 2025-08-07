export default function CallsHistoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Call History</h1>
        <p className="text-muted-foreground">
          View detailed records of all calls made through the system.
        </p>
      </div>
      
      <div className="grid gap-6">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Call Records</h2>
            <p className="text-muted-foreground">
              This page will display a comprehensive list of all calls with details, recordings, and outcomes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 