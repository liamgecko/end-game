export default function SettingsFieldManagementPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Field Management</h1>
        <p className="text-muted-foreground">
          Configure and manage custom fields across the platform.
        </p>
      </div>
      
      <div className="grid gap-6">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Field Configuration</h2>
            <p className="text-muted-foreground">
              This page will allow you to create and manage custom fields for contacts, organisations, and other entities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 