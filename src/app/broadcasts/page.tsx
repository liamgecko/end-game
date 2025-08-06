export default function BroadcastsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Broadcasts</h1>
        <p className="text-muted-foreground">
          Send messages and announcements to your audience.
        </p>
      </div>
      
      <div className="rounded-lg border">
        <div className="p-6">
          <h3 className="text-lg font-semibold">Recent Broadcasts</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Your broadcast history will appear here.
          </p>
        </div>
      </div>
    </div>
  );
} 