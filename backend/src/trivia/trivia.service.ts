import * as fs from 'fs';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import ErrorResponse from 'src/shared/errorResponse';
import { TriviaDto } from './dto/trivia.dto';
import { Trivia } from './interfaces/trivia.interface';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class TriviaService {
  constructor(
    @InjectModel('Trivia') private triviaModel: Model<Trivia>,
    @Inject(REQUEST) private readonly req: Request,
  ) {}

  async addTrivia(triviaDto: TriviaDto) {
    const { question, answerA, answerB, answerC, answerD, correctAnswer } =
      triviaDto;

    // create trivia
    const trivia = await this.triviaModel.create({
      question,
      answerA,
      answerB,
      answerC,
      answerD,
      correctAnswer,
    });

    return {
      success: true,
      trivia,
    };
  }

  async updateTrivia(triviaDto: TriviaDto) {
    const { question, answerA, answerB, answerC, answerD, _id, correctAnswer } =
      triviaDto;

    // create trivia
    const trivia = await this.triviaModel.findByIdAndUpdate(_id, {
      question,
      answerA,
      answerB,
      answerC,
      answerD,
      correctAnswer,
    });

    return {
      success: true,
      trivia,
    };
  }

  async getAllTrivia() {
    const allTrivia = await this.triviaModel.find();
    return {
      success: true,
      allTrivia,
    };
  }

  async deleteTrivia() {
    const { id } = this.req.params;

    await this.triviaModel.findByIdAndDelete(id);

    fs.unlink(`${process.env.UPLOAD_PATH}/${id}.mp4`, (err) => {
      if (err) throw new ErrorResponse('Problem with contract upload', 500);
    });

    return {
      success: true,
    };
  }

  async getTrivia(pastTrivia: string[]) {
    const allTriviaNotPast = await this.triviaModel.find({
      _id: {
        $not: { $in: pastTrivia },
      },
    });

    if (allTriviaNotPast.length) {
      const trivia =
        allTriviaNotPast[Math.floor(Math.random() * allTriviaNotPast.length)];

      return {
        success: true,
        trivia,
      };
    } else {
      const count = await this.triviaModel.count();

      const random = Math.floor(Math.random() * count);

      const trivia = await this.triviaModel.findOne().skip(random);
      return {
        success: true,
        trivia,
        resetPastTrivia: true,
      };
    }
  }

  async submitFeedback({
    feedback,
    id,
  }: {
    feedback: 'negative' | 'positive';
    id: string;
  }) {
    const trivia = await this.triviaModel.findById(id);
    if (!trivia.feedback.positive) {
      const zeroFeedback = { positive: 0, negative: 0 };
      trivia.feedback = { ...zeroFeedback, [feedback]: 1 };
    } else {
      trivia.feedback[feedback]++;
    }
    await trivia.save();
    return {
      success: true,
    };
  }
}
