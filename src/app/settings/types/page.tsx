export default function OrganisationsTypesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Organisation Types</h1>
        <p className="text-muted-foreground">
          Manage different types and categories of organisations.
        </p>
      </div>
      
      <div className="grid gap-6">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Type Management</h2>
            <p className="text-muted-foreground">
              This page will allow you to create and manage different organisation types and categories.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 