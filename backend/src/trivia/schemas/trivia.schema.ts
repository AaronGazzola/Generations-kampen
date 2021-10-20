import * as mongoose from 'mongoose';

export const TriviaSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answerA: String,
  answerB: String,
  answerC: String,
  answerD: String,
  correctAnswer: String,
  feedback: {
    positive: Number,
    negative: Number,
  },
});
