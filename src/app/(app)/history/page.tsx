import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { History } from "lucide-react";

export default function HistoryPage() {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-8">Submission History</h1>
      <Card>
        <CardHeader>
          <CardTitle>Past Questionnaires</CardTitle>
          <CardDescription>Review your previous submissions and feedback.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-16 border-2 border-dashed rounded-lg">
            <History className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">No History Yet</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Your completed questionnaires will appear here.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
