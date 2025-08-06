export default function OverviewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Overview</h1>
        <p className="text-muted-foreground">
          Welcome to your dashboard overview.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-semibold">Total Forms</h3>
          <p className="text-2xl font-bold">24</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-semibold">Active Events</h3>
          <p className="text-2xl font-bold">12</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-semibold">Conversations</h3>
          <p className="text-2xl font-bold">156</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-semibold">Broadcasts</h3>
          <p className="text-2xl font-bold">8</p>
        </div>
      </div>
    </div>
  );
} 