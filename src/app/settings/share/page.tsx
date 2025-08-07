export default function EventsSharePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Share Events</h1>
        <p className="text-muted-foreground">
          Configure sharing settings and social media integration for your events.
        </p>
      </div>
      
      <div className="grid gap-6">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Sharing Configuration</h2>
            <p className="text-muted-foreground">
              This page will allow you to configure how events are shared across different platforms and channels.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 