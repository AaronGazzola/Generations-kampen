import { Document } from 'mongoose';

export interface Trivia extends Document {
  question: string;
  answerA: string;
  answerB: string;
  answerC: string;
  answerD: string;
  feeback?: {
    positive: number;
    negative: number;
  };
}
