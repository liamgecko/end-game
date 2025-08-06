export default function FormsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Forms</h1>
        <p className="text-muted-foreground">
          Manage your forms and surveys.
        </p>
      </div>
      
      <div className="rounded-lg border">
        <div className="p-6">
          <h3 className="text-lg font-semibold">Recent Forms</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Your most recently created forms will appear here.
          </p>
        </div>
      </div>
    </div>
  );
} 