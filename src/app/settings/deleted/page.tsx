export default function EventsDeletedPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Deleted Events</h1>
        <p className="text-muted-foreground">
          View and restore deleted events from your account.
        </p>
      </div>
      
      <div className="grid gap-6">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Trash</h2>
            <p className="text-muted-foreground">
              This page will display all deleted events with options to restore or permanently delete them.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 