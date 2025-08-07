export default function ConversationsTeamsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Conversation Teams</h1>
        <p className="text-muted-foreground">
          Organize users into teams for conversation management.
        </p>
      </div>
      
      <div className="grid gap-6">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Team Management</h2>
            <p className="text-muted-foreground">
              This page will allow you to create and manage teams for organizing conversation handling.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 