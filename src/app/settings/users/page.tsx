export default function ConversationsUsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Conversation Users</h1>
        <p className="text-muted-foreground">
          Manage users and permissions for conversation handling.
        </p>
      </div>
      
      <div className="grid gap-6">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">User Management</h2>
            <p className="text-muted-foreground">
              This page will allow you to manage users who can handle conversations and their permissions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 