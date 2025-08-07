export default function CallsNumbersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Call Numbers</h1>
        <p className="text-muted-foreground">
          Manage phone numbers for your call campaigns.
        </p>
      </div>
      
      <div className="grid gap-6">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Number Management</h2>
            <p className="text-muted-foreground">
              This page will allow you to purchase, configure, and manage phone numbers for your call campaigns.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 