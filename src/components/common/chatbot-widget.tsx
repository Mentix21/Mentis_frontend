"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Send, X, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Message } from "@/lib/types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const faqs: { [key: string]: string } = {
    booking: "To book an appointment, go to the 'Appointments' page from the main menu. You can filter by doctor and date, then select an available time slot.",
    questionnaire: "You can start a new questionnaire from your dashboard. Your progress is saved automatically, so you can return to it later.",
    help: "You can ask me about booking appointments, filling out questionnaires, or viewing your history. If you need more specific help, I can connect you with a staff member.",
    connect: "We'll connect you to a human staff member shortly. Please check your university email for follow-up."
};

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", from: "bot", text: "Hi, how can I help you today? You can ask me about booking, questionnaires, or type 'help'." },
  ]);
  const [input, setInput] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), from: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);

    setTimeout(() => {
        const botResponseText = getBotResponse(input.toLowerCase());
        const botMessage: Message = { id: (Date.now() + 1).toString(), from: 'bot', text: botResponseText };
        setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setInput("");
  };

  const getBotResponse = (query: string): string => {
    if (query.includes("book") || query.includes("appointment")) return faqs.booking;
    if (query.includes("questionnaire") || query.includes("form")) return faqs.questionnaire;
    if (query.includes("connect") || query.includes("human")) return faqs.connect;
    return faqs.help;
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button onClick={() => setIsOpen(true)} size="icon" className="rounded-full h-16 w-16 shadow-lg animate-in fade-in-0 zoom-in-75 duration-300">
          <MessageSquare className="h-8 w-8" />
          <span className="sr-only">Open Chat</span>
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[calc(100vw-48px)] h-[60vh] sm:w-80 sm:h-[28rem] bg-card rounded-xl shadow-2xl flex flex-col animate-in fade-in-0 zoom-in-95 duration-300">
      <header className="p-4 border-b flex justify-between items-center">
        <h3 className="font-semibold text-lg">Mentis Assistant</h3>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
          <X className="h-5 w-5" />
          <span className="sr-only">Close Chat</span>
        </Button>
      </header>
      <ScrollArea className="flex-1" ref={scrollAreaRef}>
        <div className="p-4 space-y-4">
            {messages.map((message) => (
                <div key={message.id} className={cn("flex items-end gap-2", { "justify-end": message.from === 'user' })}>
                    {message.from === 'bot' && (
                        <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary text-primary-foreground">
                                <Bot className="h-5 w-5"/>
                            </AvatarFallback>
                        </Avatar>
                    )}
                    <div className={cn("max-w-[80%] rounded-lg px-3 py-2 text-sm", 
                        message.from === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                    )}>
                        {message.text}
                    </div>
                </div>
            ))}
        </div>
      </ScrollArea>
      <footer className="p-2 border-t">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <Input 
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type a message..." 
            className="flex-1"
            aria-label="Chat message"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </footer>
    </div>
  );
}
