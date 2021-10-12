import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import ErrorResponse from 'src/shared/errorResponse';
import { TriviaDto } from './dto/trivia.dto';
import { Trivia } from './interfaces/trivia.interface';

@Injectable()
export class TriviaService {
  constructor(@InjectModel('Trivia') private triviaModel: Model<Trivia>) {}

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

  async getAllTrivia() {
    const allTrivia = await this.triviaModel.find();
    return {
      success: true,
      allTrivia,
    };
  }
}
