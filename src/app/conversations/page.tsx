export default function ConversationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Conversations</h1>
        <p className="text-muted-foreground">
          Manage your customer conversations and messages.
        </p>
      </div>
      
      <div className="rounded-lg border">
        <div className="p-6">
          <h3 className="text-lg font-semibold">Recent Conversations</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Your active conversations will appear here.
          </p>
        </div>
      </div>
    </div>
  );
} 