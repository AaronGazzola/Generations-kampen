import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path';

@Injectable()
export class VideosService {
  constructor() {}
  async getVideo(res: Response) {
    const fileName = 'video1.mp4';

    const filePath = path.join(
      process.env.NODE_ENV === 'production'
        ? process.env.NODE_PATH_PROD
        : process.env.NODE_PATH_DEV,
      process.env.UPLOAD_PATH,
      fileName,
    );
    res.download(filePath);
  }
}
