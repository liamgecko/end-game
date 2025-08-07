export default function CallsAgentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Call Agents</h1>
        <p className="text-muted-foreground">
          Manage call agents and their performance.
        </p>
      </div>
      
      <div className="grid gap-6">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Agent Management</h2>
            <p className="text-muted-foreground">
              This page will allow you to manage call agents, assign campaigns, and monitor their performance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 