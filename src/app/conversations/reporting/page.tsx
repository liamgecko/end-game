export default function ConversationsReportingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Conversation Analytics</h1>
        <p className="text-muted-foreground">
          View reports and analytics for your conversation performance.
        </p>
      </div>
      
      <div className="grid gap-6">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Performance Reports</h2>
            <p className="text-muted-foreground">
              This page will display analytics, metrics, and reports for conversation performance and team productivity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 