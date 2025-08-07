export default function ContactFieldsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Contact Fields</h1>
        <p className="text-muted-foreground">
          Configure custom fields for your contact database.
        </p>
      </div>
      
      <div className="grid gap-6">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Field Configuration</h2>
            <p className="text-muted-foreground">
              This page will allow you to add, edit, and manage custom contact fields.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 