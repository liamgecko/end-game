export default function SettingsUserPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">User Settings</h1>
        <p className="text-muted-foreground">
          Manage your personal user preferences and profile.
        </p>
      </div>
      
      <div className="grid gap-6">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Personal Configuration</h2>
            <p className="text-muted-foreground">
              This page will allow you to update your personal settings, preferences, and profile information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 