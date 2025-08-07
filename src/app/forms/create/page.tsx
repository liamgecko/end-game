export default function FormsCreatePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Create New Form</h1>
        <p className="text-muted-foreground">
          Build custom forms to collect information from your contacts.
        </p>
      </div>
      
      <div className="grid gap-6">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Form Builder</h2>
            <p className="text-muted-foreground">
              This page will contain the form builder interface.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 