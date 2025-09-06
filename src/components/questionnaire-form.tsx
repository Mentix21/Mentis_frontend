"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "@/hooks/use-local-storage";
import type { Question } from "@/lib/types";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";

type QuestionnaireFormProps = {
  type: "mental-health" | "physical-health";
  questions: Question[];
};

function QuestionRenderer({
  question,
  answer,
  onAnswer,
}: {
  question: Question;
  answer: any;
  onAnswer: (value: any) => void;
}) {
  switch (question.type) {
    case "multiple-choice":
      return (
        <RadioGroup value={answer} onValueChange={onAnswer}>
          {question.options?.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={`${question.id}-${option}`} />
              <Label htmlFor={`${question.id}-${option}`}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      );
    case "slider":
      return (
        <div className="py-4">
            <Slider
              value={[answer || question.min || 1]}
              onValueChange={(value) => onAnswer(value[0])}
              min={question.min}
              max={question.max}
              step={1}
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>{question.minLabel}</span>
                <span>{question.maxLabel}</span>
            </div>
        </div>
      );
    case 'rating':
      return (
        <div className="flex items-center gap-2 pt-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <Star
              key={value}
              className={`h-8 w-8 cursor-pointer transition-colors ${answer >= value ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
              onClick={() => onAnswer(value)}
            />
          ))}
        </div>
      );
    case "text":
      return (
        <Textarea
          value={answer || ""}
          onChange={(e) => onAnswer(e.target.value)}
          placeholder="Your response..."
        />
      );
    default:
      return null;
  }
}

export default function QuestionnaireForm({
  type,
  questions,
}: QuestionnaireFormProps) {
  const router = useRouter();
  const [answers, setAnswers] = useLocalStorage(`questionnaire-answers-${type}`, {});
  const [currentStep, setCurrentStep] = useState(0);

  const progress = ((currentStep + 1) / questions.length) * 100;
  const currentQuestion = questions[currentStep];

  const handleAnswer = (value: any) => {
    setAnswers((prev: any) => ({ ...prev, [currentQuestion.id]: value }));
  };
  
  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    sessionStorage.setItem('latest-questionnaire-results', JSON.stringify({ type, answers }));
    router.push('/questionnaire/results');
  };

  return (
    <div className="container max-w-2xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="capitalize text-2xl">
            {type.replace("-", " ")} Questionnaire
          </CardTitle>
          <CardDescription>Step {currentStep + 1} of {questions.length}</CardDescription>
          <Progress value={progress} className="mt-4" />
        </CardHeader>
        <CardContent className="min-h-[200px]">
            <div className="space-y-4">
                <Label className="text-lg">{currentQuestion.text}</Label>
                <QuestionRenderer 
                    question={currentQuestion}
                    answer={answers[currentQuestion.id]}
                    onAnswer={handleAnswer}
                />
            </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handlePrev} disabled={currentStep === 0}>
            Previous
          </Button>
          {currentStep < questions.length - 1 ? (
            <Button onClick={handleNext}>Next</Button>
          ) : (
            <Button onClick={handleSubmit}>View Summary</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
