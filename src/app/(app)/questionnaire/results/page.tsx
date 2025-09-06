"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { summarizeQuestionnaire, type SummarizeQuestionnaireOutput } from '@/ai/flows/summarize-questionnaire-results';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Lightbulb, BarChart2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

export default function ResultsPage() {
    const router = useRouter();
    const [result, setResult] = useState<SummarizeQuestionnaireOutput | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [questionnaireData, setQuestionnaireData] = useState<{ type: string; answers: any } | null>(null);

    useEffect(() => {
        const resultsString = sessionStorage.getItem('latest-questionnaire-results');
        if (!resultsString) {
            router.replace('/dashboard');
            return;
        }

        const data = JSON.parse(resultsString);
        setQuestionnaireData(data);

        const getSummary = async () => {
            try {
                setIsLoading(true);
                setError('');
                const aiResult = await summarizeQuestionnaire({ responses: data.answers });
                setResult(aiResult);
            } catch (e) {
                console.error(e);
                setError('Failed to generate AI summary. Please try again later.');
            } finally {
                setIsLoading(false);
                // Clean up sessionStorage, but maybe after a delay in case of refresh
                // sessionStorage.removeItem('latest-questionnaire-results');
            }
        };

        getSummary();
    }, [router]);
    
    const chartData = questionnaireData?.answers ? Object.entries(questionnaireData.answers)
        .filter(([key, value]) => typeof value === 'number')
        .map(([key, value]) => ({ name: key.replace('-', ' '), value })) : [];

    return (
        <div className="container max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Your Summary</h1>
            <p className="text-muted-foreground mb-8">
                Here's an AI-powered summary of your {questionnaireData?.type.replace('-', ' ')} questionnaire.
            </p>
            
            {isLoading && (
                <div className="flex flex-col items-center justify-center h-64">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    <p className="mt-4 text-muted-foreground">Generating your personalized feedback...</p>
                </div>
            )}

            {error && (
                <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {result && (
                <div className="grid gap-6 lg:grid-cols-2">
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Overall Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground leading-relaxed">{result.summary}</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Lightbulb className="text-yellow-400" />
                                Feedback & Suggestions
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                             <p className="text-muted-foreground leading-relaxed">{result.feedback}</p>
                        </CardContent>
                    </Card>

                    {chartData.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <BarChart2 className="text-primary"/>
                                    Visual Snapshot
                                </CardTitle>
                                <CardDescription>A visual representation of your scaled responses.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={250}>
                                    <BarChart data={chartData}>
                                        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                        <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    )}

                    <CardFooter className="lg:col-span-2 mt-4">
                        <Button className="w-full lg:w-auto" onClick={() => router.push('/dashboard')}>
                            Back to Dashboard
                        </Button>
                    </CardFooter>
                </div>
            )}
        </div>
    );
}
