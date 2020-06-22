import { Request } from 'express';
import { diskStorage, FileFilterCallback } from 'multer';
import path from 'path';
import crypto from 'crypto';

const multerConfig = {
  directory: path.resolve(__dirname, '..', '..', 'tmp'),

  storage: diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'tmp'),
    filename(request: Request, file: Express.Multer.File, callback) {
      const fileNamePrefix = crypto.randomBytes(11).toString('hex');
      const fileName = `${fileNamePrefix}-${file.originalname}`;

      callback(null, fileName);
    },
  }),

  fileFilter(
    _: Request,
    file: Express.Multer.File,
    callback: FileFilterCallback,
  ): boolean {
    const acceptedFilesFormat = [
      'image/png',
      'image/jpg',
      'image/jpeg',
      'image/svg',
    ];

    const isAcceptedFormat = acceptedFilesFormat.includes(file.mimetype);

    if (isAcceptedFormat) {
      callback(null, true);
    }

    callback(null, false);

    return isAcceptedFormat;
  },
};

export default multerConfig;
