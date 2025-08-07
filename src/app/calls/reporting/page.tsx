export default function CallsReportingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Call Reporting</h1>
        <p className="text-muted-foreground">
          Generate detailed reports and analytics for call performance.
        </p>
      </div>
      
      <div className="grid gap-6">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Performance Reports</h2>
            <p className="text-muted-foreground">
              This page will provide comprehensive reporting tools for call campaigns, agent performance, and outcomes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 