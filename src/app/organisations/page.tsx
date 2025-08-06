export default function OrganisationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Organisations</h1>
        <p className="text-muted-foreground">
          Manage your organization settings and members.
        </p>
      </div>
      
      <div className="rounded-lg border">
        <div className="p-6">
          <h3 className="text-lg font-semibold">Organization Details</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Your organization information will appear here.
          </p>
        </div>
      </div>
    </div>
  );
} 