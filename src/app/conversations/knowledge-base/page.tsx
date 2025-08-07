export default function KnowledgeBasePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Knowledge Base</h1>
        <p className="text-muted-foreground">
          Create and manage articles and resources for automated responses.
        </p>
      </div>
      
      <div className="grid gap-6">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Article Management</h2>
            <p className="text-muted-foreground">
              This page will allow you to create, edit, and organize knowledge base articles for AI responses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 