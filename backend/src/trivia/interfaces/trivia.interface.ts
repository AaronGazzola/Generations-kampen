import { Document } from 'mongoose';

export interface Trivia extends Document {
  [index: string]: any;
  question: string;
  answerA: string;
  answerB: string;
  answerC: string;
  answerD: string;
  feedback?: {
    [index: string]: any;
    positive: number;
    negative: number;
  };
}
