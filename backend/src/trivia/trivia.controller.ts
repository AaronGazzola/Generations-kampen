import { TriviaService } from './trivia.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
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

  @UseGuards(JwtAuthGuard)
  @Put('')
  updateTrivia(@Body(ValidationPipe) triviaDto: TriviaDto) {
    return this.triviaService.updateTrivia(triviaDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  deleteTrivia() {
    return this.triviaService.deleteTrivia();
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  getAllTrivia() {
    return this.triviaService.getAllTrivia();
  }

  @Post('/play')
  getTrivia(@Body() { pastTrivia }: { pastTrivia: string[] }) {
    return this.triviaService.getTrivia(pastTrivia);
  }
}
