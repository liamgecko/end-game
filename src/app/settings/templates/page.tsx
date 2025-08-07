export default function BroadcastsTemplatesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Email & SMS Templates</h1>
        <p className="text-muted-foreground">
          Create and manage reusable templates for your campaigns.
        </p>
      </div>
      
      <div className="grid gap-6">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Template Management</h2>
            <p className="text-muted-foreground">
              This page will allow you to create, edit, and manage email and SMS templates for your campaigns.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 