import type { ReactNode } from "react";
import Header from "@/components/common/header";
import ChatbotWidget from "@/components/common/chatbot-widget";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="p-4 sm:p-6 md:p-8">
        {children}
      </main>
      <ChatbotWidget />
    </div>
  );
}
