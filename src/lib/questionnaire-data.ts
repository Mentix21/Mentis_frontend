import type { Question } from '@/lib/types';

export const mentalHealthQuestions: Question[] = [
  {
    id: 'mood',
    text: 'Over the last 2 weeks, how often have you been bothered by feeling down, depressed, or hopeless?',
    type: 'multiple-choice',
    options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
  },
  {
    id: 'anxiety',
    text: 'Over the last 2 weeks, how often have you been bothered by feeling nervous, anxious, or on edge?',
    type: 'multiple-choice',
    options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
  },
  {
    id: 'stress-level',
    text: 'On a scale of 1 to 10, how would you rate your current stress level related to academics?',
    type: 'slider',
    min: 1,
    max: 10,
    minLabel: 'Not stressed',
    maxLabel: 'Extremely stressed',
  },
  {
    id: 'social-connection',
    text: 'How connected do you feel to others on campus?',
    type: 'rating',
  },
  {
    id: 'concerns',
    text: 'Are there any specific concerns or challenges you are currently facing? (Optional)',
    type: 'text',
  },
];

export const physicalHealthQuestions: Question[] = [
    {
        id: 'sleep',
        text: 'On average, how many hours of sleep do you get per night?',
        type: 'multiple-choice',
        options: ['Less than 5 hours', '5-6 hours', '7-8 hours', 'More than 8 hours'],
    },
    {
        id: 'exercise',
        text: 'How many days per week do you engage in at least 30 minutes of moderate physical activity?',
        type: 'multiple-choice',
        options: ['0 days', '1-2 days', '3-4 days', '5 or more days'],
    },
    {
        id: 'diet-quality',
        text: 'On a scale of 1 to 10, how would you rate the nutritional quality of your diet?',
        type: 'slider',
        min: 1,
        max: 10,
        minLabel: 'Very Poor',
        maxLabel: 'Excellent',
    },
    {
        id: 'energy-level',
        text: 'How would you rate your overall energy level throughout the day?',
        type: 'rating',
    },
    {
        id: 'physical-symptoms',
        text: 'Are you experiencing any persistent physical symptoms (e.g., headaches, fatigue, pain)? If so, please describe.',
        type: 'text',
    },
];
