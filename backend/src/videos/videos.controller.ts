import { Controller, Get, Response } from '@nestjs/common';
import { VideosService } from './videos.service';

@Controller('api/videos')
export class VideosController {
  constructor(private videosService: VideosService) {}
  @Get('/')
  async getVideo(@Response() res) {
    return await this.videosService.getVideo(res);
  }
}
