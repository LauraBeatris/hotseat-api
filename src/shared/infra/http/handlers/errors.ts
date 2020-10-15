import { Request, Response, NextFunction } from 'express';
import AppError from '@shared/errors/AppError';

const errorHandler = (
  error: Error,
  request: Request,
  response: Response,
  _: NextFunction,
): Response => {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.error(error);
  }

  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
};

export default errorHandler;
