import { TriviaService } from './trivia.service';
import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { TriviaDto } from './dto/trivia.dto';

@Controller('api/trivia')
export class TriviaController {
  constructor(private triviaService: TriviaService) {}

  @UseGuards(JwtAuthGuard)
  @Post('')
  addTrivia(@Body(ValidationPipe) triviaDto: TriviaDto) {
    return this.triviaService.addTrivia(triviaDto);
  }
}
