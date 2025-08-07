export default function EventsLocationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Event Locations</h1>
        <p className="text-muted-foreground">
          Manage venues and locations for your events.
        </p>
      </div>
      
      <div className="grid gap-6">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Location Management</h2>
            <p className="text-muted-foreground">
              This page will allow you to add, edit, and manage event venues and locations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 