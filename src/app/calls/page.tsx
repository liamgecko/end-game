export default function CallsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Calls</h1>
        <p className="text-muted-foreground">
          Manage your call history and recordings.
        </p>
      </div>
      
      <div className="rounded-lg border">
        <div className="p-6">
          <h3 className="text-lg font-semibold">Recent Calls</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Your call history will appear here.
          </p>
        </div>
      </div>
    </div>
  );
} 