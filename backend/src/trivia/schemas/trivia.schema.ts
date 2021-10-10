import * as mongoose from 'mongoose';

export const TriviaSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answers: {
    a: String,
    b: String,
    c: String,
    d: String,
  },
  feeback: {
    positive: Number,
    negative: Number,
  },
});
