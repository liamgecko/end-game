export default function SettingsDataPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Data Management</h1>
        <p className="text-muted-foreground">
          Manage data imports, exports, and database settings.
        </p>
      </div>
      
      <div className="grid gap-6">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Data Administration</h2>
            <p className="text-muted-foreground">
              This page will allow you to import, export, and manage your data with backup and recovery options.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 