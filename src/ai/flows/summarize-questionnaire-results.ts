'use server';

/**
 * @fileOverview Summarizes questionnaire results and provides personalized feedback.
 *
 * - summarizeQuestionnaire - A function that takes questionnaire responses as input and returns a summary with feedback.
 * - SummarizeQuestionnaireInput - The input type for the summarizeQuestionnaire function.
 * - SummarizeQuestionnaireOutput - The return type for the summarizeQuestionnaire function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeQuestionnaireInputSchema = z.object({
  responses: z.record(z.string(), z.any()).describe('The student responses to the questionnaire.'),
});
export type SummarizeQuestionnaireInput = z.infer<typeof SummarizeQuestionnaireInputSchema>;

const SummarizeQuestionnaireOutputSchema = z.object({
  summary: z.string().describe('A summary of the questionnaire responses.'),
  feedback: z.string().describe('Personalized feedback and suggestions based on the responses.'),
});
export type SummarizeQuestionnaireOutput = z.infer<typeof SummarizeQuestionnaireOutputSchema>;

export async function summarizeQuestionnaire(input: SummarizeQuestionnaireInput): Promise<SummarizeQuestionnaireOutput> {
  return summarizeQuestionnaireFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeQuestionnairePrompt',
  input: {schema: SummarizeQuestionnaireInputSchema},
  output: {schema: SummarizeQuestionnaireOutputSchema},
  prompt: `You are an AI assistant designed to summarize health questionnaire responses and provide personalized feedback to college students.

  Summarize the following questionnaire responses and provide feedback and suggestions for improvement. Be encouraging and supportive.

  Questionnaire Responses: {{{responses}}}
  `,
});

const summarizeQuestionnaireFlow = ai.defineFlow(
  {
    name: 'summarizeQuestionnaireFlow',
    inputSchema: SummarizeQuestionnaireInputSchema,
    outputSchema: SummarizeQuestionnaireOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
