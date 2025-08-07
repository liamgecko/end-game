export default function SettingsPortalPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Portal Settings</h1>
        <p className="text-muted-foreground">
          Configure customer portal and self-service settings.
        </p>
      </div>
      
      <div className="grid gap-6">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Portal Configuration</h2>
            <p className="text-muted-foreground">
              This page will allow you to configure customer portal settings, branding, and self-service options.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 