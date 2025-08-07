export default function OrganisationsListPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Organisations Overview</h1>
        <p className="text-muted-foreground">
          View and manage all organisations in your database.
        </p>
      </div>
      
      <div className="grid gap-6">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Organisation Management</h2>
            <p className="text-muted-foreground">
              This page will display all organisations with search, filtering, and management capabilities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 