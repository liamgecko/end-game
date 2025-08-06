export default function MessagesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Messages</h1>
        <p className="text-muted-foreground">
          View and manage your message history.
        </p>
      </div>
      
      <div className="rounded-lg border">
        <div className="p-6">
          <h3 className="text-lg font-semibold">Message History</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Your sent and received messages will appear here.
          </p>
        </div>
      </div>
    </div>
  );
} 