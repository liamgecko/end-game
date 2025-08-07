export default function WidgetsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Chat Widgets</h1>
        <p className="text-muted-foreground">
          Create and customize chat widgets for your website.
        </p>
      </div>
      
      <div className="grid gap-6">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Widget Management</h2>
            <p className="text-muted-foreground">
              This page will allow you to create, customize, and embed chat widgets on your websites.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 