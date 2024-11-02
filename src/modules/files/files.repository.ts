import { BadRequestException, Injectable } from '@nestjs/common';
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';
import { db } from '../../config/db';
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from '../../config/enviroments.config';
import { files, InsertImage } from '../../../db/schemas/files.schema';

@Injectable()
export class FilesRepository {
  constructor() {
    cloudinary.config({
      cloud_name: CLOUDINARY_CLOUD_NAME,
      api_key: CLOUDINARY_API_KEY,
      api_secret: CLOUDINARY_API_SECRET,
    });
  }

  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        { resource_type: 'auto' },
        (error, result) => {
          if (error) {
            reject(error);
          } else if (result) {
            resolve(result);
          } else {
            reject(new BadRequestException(`Error uploading image file.`));
          }
        },
      );

      const stream = Readable.from(file.buffer);
      stream.pipe(upload);
    });
  }

  async removeSingleImage(publicId: string): Promise<Object> {
    return await cloudinary.uploader.destroy(publicId);
  }

  async removeMultipleImages(publicsIds: string[]): Promise<Object> {
    if (publicsIds.length >= 100)
      throw new BadRequestException(`Can't delete 100 or more assets.`);

    return await cloudinary.api.delete_resources(publicsIds);
  }

  async createMultipleImages(imageData: InsertImage[]): Promise<void> {
    await db.insert(files).values(imageData);
  }
}
