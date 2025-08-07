export default function BroadcastsCreatePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Create New Campaign</h1>
        <p className="text-muted-foreground">
          Set up email and SMS campaigns for your audience.
        </p>
      </div>
      
      <div className="grid gap-6">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Campaign Builder</h2>
            <p className="text-muted-foreground">
              This page will contain the campaign creation wizard for email and SMS broadcasts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 