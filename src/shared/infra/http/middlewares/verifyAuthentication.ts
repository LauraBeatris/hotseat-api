import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface JWTPayload {
  sub: string;
}

const authMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction,
): void => {
  try {
    const { authorization } = request.headers;

    if (!authorization) {
      throw new AppError('Authorization token not provided', 403);
    }

    const [, token] = authorization?.split(' ');

    const { sub } = verify(token, authConfig.jwt.secret) as JWTPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch (error) {
    throw new AppError(error.message);
  }
};

export default authMiddleware;
