import * as fs from 'fs';
import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Response, Request } from 'express';
import * as path from 'path';
import ErrorResponse from 'src/shared/errorResponse';

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

  async uploadVideo(file: any) {
    if (!file || file.mimetype !== 'video/mp4')
      throw new ErrorResponse('Please upload an mp4 file', 401);

    const { id } = this.req.params;

    const fileName = `${id}.mp4`;

    const filePath = `${process.env.UPLOAD_PATH}/${fileName}`;

    // rename uploaded file
    fs.rename(
      `${process.env.UPLOAD_PATH}/${file.filename}`,
      filePath,
      (err) => {
        if (err) throw new ErrorResponse('Problem with contract upload', 500);
      },
    );

    return {
      success: true,
    };
  }
}
