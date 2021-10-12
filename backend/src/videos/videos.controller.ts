import {
  Controller,
  Get,
  Post,
  Request,
  Response,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { VideosService } from './videos.service';

@Controller('api/videos')
export class VideosController {
  constructor(private videosService: VideosService) {}
  @Get('/:id')
  async getVideo(@Response() res) {
    return await this.videosService.getVideo(res);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:id')
  @UseInterceptors(FileInterceptor('video', { dest: './videos' }))
  async uploadVideo(@UploadedFile() file: Express.Multer.File, @Request() req) {
    return await this.videosService.uploadVideo(file);
  }
}
