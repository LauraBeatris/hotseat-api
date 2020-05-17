import multer from 'multer';
import uploadConfig from '../config/upload';

const uploadMiddleware = multer(uploadConfig);

export default uploadMiddleware;
