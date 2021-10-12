import { IsString } from 'class-validator';

export class TriviaDto {
  _id?: string;

  @IsString()
  question: string;

  @IsString()
  answerA: string;

  @IsString()
  answerB: string;

  @IsString()
  answerC: string;

  @IsString()
  answerD: string;
}
