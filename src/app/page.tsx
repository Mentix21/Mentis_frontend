import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HeartPulse, Mail, Lock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <title>Google</title>
    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.62 1.9-4.72 1.9-4.27 0-7.75-3.5-7.75-7.75s3.48-7.75 7.75-7.75c2.42 0 4.02.96 4.9 1.84l2.5-2.5C18.16 3.7 15.65 2.5 12.48 2.5 7.23 2.5 3 6.7 3 12s4.23 9.5 9.48 9.5c2.82 0 5.1-1 6.7-2.6.8-.8 1.25-1.8 1.4-2.9h-8.22z" />
  </svg>
);

export default function LoginPage() {
  return (
    <main className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <Image
          src="https://picsum.photos/1200/1800"
          alt="Students walking on campus"
          width={1200}
          height={1800}
          className="h-full w-full object-cover"
          data-ai-hint="happy students campus"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
      <div className="flex items-center justify-center bg-background p-4 sm:p-8">
        <Card className="w-full max-w-md border-0 bg-transparent shadow-none sm:border sm:bg-card sm:shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <HeartPulse className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-3xl font-bold">
              Welcome to Mentis
            </CardTitle>
            <CardDescription>
              Your Partner in Student Wellness.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="student@university.edu"
                required
                className="pl-10"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                id="password" 
                type="password" 
                required 
                placeholder="Password"
                className="pl-10"
              />
               <Link
                  href="#"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-primary hover:underline"
                >
                  Forgot?
                </Link>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full" size="lg" asChild>
              <Link href="/dashboard">Sign In</Link>
            </Button>
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="grid w-full grid-cols-1 gap-4">
              <Button variant="outline">
                <GoogleIcon className="mr-2 h-5 w-5 fill-current" /> Google
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
