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
    const { question, answerA, answerB, answerC, answerD } = triviaDto;

    // create trivia
    const trivia = await this.triviaModel.create({
      question,
      answerA,
      answerB,
      answerC,
      answerD,
    });

    return {
      success: true,
      trivia,
    };
  }

  async updateTrivia(triviaDto: TriviaDto) {
    const { question, answerA, answerB, answerC, answerD, _id } = triviaDto;

    // create trivia
    const trivia = await this.triviaModel.findByIdAndUpdate(_id, {
      question,
      answerA,
      answerB,
      answerC,
      answerD,
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
}
