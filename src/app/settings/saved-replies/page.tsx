export default function SavedRepliesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Saved Replies</h1>
        <p className="text-muted-foreground">
          Create and manage reusable response templates.
        </p>
      </div>
      
      <div className="grid gap-6">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Reply Templates</h2>
            <p className="text-muted-foreground">
              This page will allow you to create, edit, and manage saved reply templates for quick responses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 