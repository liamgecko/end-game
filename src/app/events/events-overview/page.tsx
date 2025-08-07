export default function EventsOverviewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Events Overview</h1>
        <p className="text-muted-foreground">
          View and manage all your scheduled and past events.
        </p>
      </div>
      
      <div className="grid gap-6">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">My Events</h2>
            <p className="text-muted-foreground">
              This page will display a calendar view and list of all your events with their status and details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 