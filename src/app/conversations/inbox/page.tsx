export default function ConversationsInboxPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Inbox</h1>
        <p className="text-muted-foreground">
          Manage and respond to incoming conversations and messages.
        </p>
      </div>
      
      <div className="grid gap-6">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Conversation Management</h2>
            <p className="text-muted-foreground">
              This page will display all incoming conversations with filtering and response tools.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 