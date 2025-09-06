import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { BrainCircuit, Dumbbell, CalendarClock, History } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  const studentName = "Alex"; // Placeholder
  const upcomingAppointments = [
    // Placeholder data
    {
      id: 1,
      doctor: "Dr. Anya Sharma",
      specialty: "Psychiatry",
      time: "Tomorrow at 2:30 PM",
      type: "Virtual",
    },
  ];

  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">
          Welcome back, {studentName}!
        </h1>
        <p className="text-muted-foreground mt-2">
          Here&apos;s your health and wellness overview.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="flex flex-col @container hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>New Questionnaire</CardTitle>
            <CardDescription>
              Start a new mental or physical health check-in.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col justify-center gap-4">
            <Button
              size="lg"
              className="w-full @[22rem]:h-20 @[22rem]:text-lg transition-transform hover:scale-105"
              asChild
            >
              <Link href="/questionnaire/mental-health">
                <BrainCircuit className="mr-2 h-5 w-5" />
                Mental Health Check-in
              </Link>
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="w-full @[22rem]:h-20 @[22rem]:text-lg transition-transform hover:scale-105"
              asChild
            >
              <Link href="/questionnaire/physical-health">
                <Dumbbell className="mr-2 h-5 w-5" />
                Physical Health Review
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="flex flex-col hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarClock className="h-6 w-6 text-primary" />
              Upcoming Appointments
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            {upcomingAppointments.length > 0 ? (
              <ul className="space-y-4">
                {upcomingAppointments.map((appt) => (
                  <li
                    key={appt.id}
                    className="p-4 rounded-lg border bg-muted/50"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold">{appt.doctor}</p>
                        <p className="text-sm text-muted-foreground">
                          {appt.specialty}
                        </p>
                      </div>
                      <Badge variant={appt.type === 'Virtual' ? 'default' : 'secondary'}>{appt.type}</Badge>
                    </div>
                    <p className="text-sm mt-2 font-medium">{appt.time}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-8 flex flex-col items-center justify-center h-full">
                <p className="text-muted-foreground mb-4">
                  No upcoming appointments.
                </p>
              </div>
            )}
          </CardContent>
           <CardFooter>
             <Button variant="default" className="w-full" asChild>
                  <Link href="/appointments">Book or Manage Appointments</Link>
              </Button>
           </CardFooter>
        </Card>

        <Card className="flex flex-col hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-6 w-6 text-primary" />
              Submission History
            </CardTitle>
            <CardDescription>
              Review your past questionnaire results and AI-powered feedback.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow flex items-center justify-center">
            <p className="text-muted-foreground text-center">Your completed questionnaires will appear here.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/history">View All History</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
