export default function SettingsAllPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">All Settings</h1>
        <p className="text-muted-foreground">
          Access all configuration options in one place.
        </p>
      </div>
      
      <div className="grid gap-6">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Settings Overview</h2>
            <p className="text-muted-foreground">
              This page will provide a comprehensive overview of all available settings with quick access links.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 