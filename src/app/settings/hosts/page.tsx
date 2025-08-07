export default function EventsHostsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Event Hosts</h1>
        <p className="text-muted-foreground">
          Manage hosts and speakers for your events.
        </p>
      </div>
      
      <div className="grid gap-6">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Host Management</h2>
            <p className="text-muted-foreground">
              This page will allow you to add, edit, and manage event hosts and their profiles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 