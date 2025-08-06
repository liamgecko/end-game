export default function ResponsesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Responses</h1>
        <p className="text-muted-foreground">
          View and manage form responses and submissions.
        </p>
      </div>
      
      <div className="rounded-lg border">
        <div className="p-6">
          <h3 className="text-lg font-semibold">Form Responses</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Your form submissions and responses will appear here.
          </p>
        </div>
      </div>
    </div>
  );
} 