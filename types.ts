export type QuestionType = 'multiple_choice' | 'essay';

export interface Question {
  id: number;
  type: QuestionType;
  chapter: string;
  difficulty: string;
  question: string;
  options?: string[];
  answer_key?: string; // Optional because essays might not have a simple key in this strict format, though the data provided implies essays don't have keys in the json
}

export interface QuizData {
  questions: Question[];
}

export type UserAnswers = Record<number, string>;