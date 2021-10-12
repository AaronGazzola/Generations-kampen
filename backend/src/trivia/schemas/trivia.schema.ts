import * as mongoose from 'mongoose';

export const TriviaSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answerA: String,
  answerB: String,
  answerC: String,
  answerD: String,
  correctAnswer: String,
  feeback: {
    positive: Number,
    negative: Number,
  },
});
