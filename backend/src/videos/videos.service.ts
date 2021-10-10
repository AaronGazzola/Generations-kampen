import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Response, Request } from 'express';
import * as path from 'path';

@Injectable()
export class VideosService {
  constructor(@Inject(REQUEST) private readonly req: Request) {}
  async getVideo(res: Response) {
    const { id } = this.req.params;

    const filePath = path.join(
      process.env.NODE_ENV === 'production'
        ? process.env.NODE_PATH_PROD
        : process.env.NODE_PATH_DEV,
      process.env.UPLOAD_PATH,
      `${id}.mp4`,
    );
    res.download(filePath);
  }
}
