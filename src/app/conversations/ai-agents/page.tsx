export default function AIAgentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">AI Agents</h1>
        <p className="text-muted-foreground">
          Configure and manage AI-powered conversation agents.
        </p>
      </div>
      
      <div className="grid gap-6">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Agent Configuration</h2>
            <p className="text-muted-foreground">
              This page will allow you to create, train, and manage AI agents for automated conversations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 