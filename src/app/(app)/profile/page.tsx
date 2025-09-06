import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const studentName = "Alex Doe";
  const studentEmail = "alex.doe@university.edu";

  return (
    <div className="container max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
      <Card>
        <CardHeader className="items-center text-center">
            <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src="https://picsum.photos/200" alt={studentName} data-ai-hint="person" />
                <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          <CardTitle className="text-2xl">{studentName}</CardTitle>
          <CardDescription>{studentEmail}</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground">
            Profile management features are coming soon.
          </p>
           <Button variant="outline" className="mt-4">Edit Profile</Button>
        </CardContent>
      </Card>
    </div>
  );
}
