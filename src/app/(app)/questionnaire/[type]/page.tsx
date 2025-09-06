import QuestionnaireForm from '@/components/questionnaire-form';
import { mentalHealthQuestions, physicalHealthQuestions } from '@/lib/questionnaire-data';
import { notFound } from 'next/navigation';

type QuestionnairePageProps = {
    params: {
        type: string;
    }
}

export default function QuestionnairePage({ params }: QuestionnairePageProps) {
    const { type } = params;

    if (type !== 'mental-health' && type !== 'physical-health') {
        notFound();
    }
    
    const questions = type === 'mental-health' ? mentalHealthQuestions : physicalHealthQuestions;
    
    return (
        <QuestionnaireForm type={type} questions={questions} />
    );
}

export function generateStaticParams() {
  return [
    { type: 'mental-health' },
    { type: 'physical-health' },
  ]
}
