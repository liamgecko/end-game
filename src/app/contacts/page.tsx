export default function ContactsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Contacts</h1>
        <p className="text-muted-foreground">
          Manage your contact database and lists.
        </p>
      </div>
      
      <div className="rounded-lg border">
        <div className="p-6">
          <h3 className="text-lg font-semibold">Contact Lists</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Your contact lists and segments will appear here.
          </p>
        </div>
      </div>
    </div>
  );
} 