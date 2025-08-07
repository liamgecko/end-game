export default function SettingsAccountPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground">
          Manage your account preferences and profile information.
        </p>
      </div>
      
      <div className="grid gap-6">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Account Configuration</h2>
            <p className="text-muted-foreground">
              This page will allow you to update your account details, preferences, and security settings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 