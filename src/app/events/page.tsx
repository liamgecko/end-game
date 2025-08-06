export default function EventsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Events</h1>
        <p className="text-muted-foreground">
          Schedule and manage your events.
        </p>
      </div>
      
      <div className="rounded-lg border">
        <div className="p-6">
          <h3 className="text-lg font-semibold">Upcoming Events</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Your scheduled events will appear here.
          </p>
        </div>
      </div>
    </div>
  );
} 