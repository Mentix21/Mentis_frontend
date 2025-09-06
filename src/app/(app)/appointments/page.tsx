"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Video, Building, Clock, User, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM"];
const specializations = ["General Health", "Psychiatry", "Nutritionist", "Physical Therapy"];

export default function AppointmentsPage() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    
    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-8">Book an Appointment</h1>
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Select a Date & Time</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col md:flex-row gap-8">
                           <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                className="rounded-md border"
                                disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
                            />
                            <div className="flex-1 space-y-4">
                               <h3 className="font-semibold text-lg">Available Slots for {date?.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h3>
                               <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                {timeSlots.map(slot => (
                                    <Button 
                                        key={slot} 
                                        variant={selectedSlot === slot ? "default" : "outline"}
                                        onClick={() => setSelectedSlot(slot)}
                                    >
                                        <Clock className="mr-2 h-4 w-4"/>
                                        {slot}
                                    </Button>
                                ))}
                               </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Filters</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label>Specialization</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Any Specialization" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {specializations.map(spec => (
                                            <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label>Appointment Type</Label>
                                <div className="flex gap-2 mt-2">
                                    <Button variant="outline" className="w-full"><Building className="mr-2 h-4 w-4"/> In-Person</Button>
                                    <Button variant="outline" className="w-full"><Video className="mr-2 h-4 w-4"/> Virtual</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                     <Button 
                        className="w-full h-12 text-lg" 
                        disabled={!date || !selectedSlot}
                        onClick={() => setShowConfirmation(true)}
                    >
                        Confirm Booking
                    </Button>
                </div>
            </div>

            <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Your Appointment</DialogTitle>
                        <DialogDescription>
                            You are about to book the following appointment.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="p-4 rounded-lg border bg-muted">
                           <p className="font-semibold flex items-center gap-2"><User/> Dr. Anya Sharma</p>
                           <p className="text-sm text-muted-foreground ml-7">Psychiatry</p>
                           <p className="text-sm mt-2 font-medium flex items-center gap-2">
                               <Clock/> {date?.toLocaleDateString()} at {selectedSlot}
                           </p>
                           <p className="text-sm mt-1 font-medium flex items-center gap-2">
                               <Video/> Virtual Appointment
                           </p>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowConfirmation(false)}>Cancel</Button>
                        <Button onClick={() => setShowConfirmation(false)}>
                            <CheckCircle className="mr-2 h-4 w-4"/> Confirm
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

             <Card className="mt-8">
                <CardHeader>
                    <CardTitle>Your Upcoming Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">You have no upcoming appointments.</p>
                </CardContent>
            </Card>
        </div>
    );
}
