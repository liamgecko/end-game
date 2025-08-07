export default function SettingsChatPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Chat Settings</h1>
        <p className="text-muted-foreground">
          Configure chat widget and conversation settings.
        </p>
      </div>
      
      <div className="grid gap-6">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Chat Configuration</h2>
            <p className="text-muted-foreground">
              This page will allow you to configure chat widget appearance, behavior, and integration settings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 