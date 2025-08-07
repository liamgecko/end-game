export default function WorkflowsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Conversation Workflows</h1>
        <p className="text-muted-foreground">
          Create automated workflows for conversation management.
        </p>
      </div>
      
      <div className="grid gap-6">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Workflow Builder</h2>
            <p className="text-muted-foreground">
              This page will allow you to create and manage automated workflows for handling conversations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 