import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import tokenValidator from '@shared/infra/http/validators/token';

interface IJWTPayload {
  sub: string;
}

const authMiddleware = (
  request: Request,
  _response: Response,
  next: NextFunction,
): void => {
  try {
    const { authorization } = request.headers;

    if (!authorization) {
      throw new AppError('Authorization token not provided', 403);
    }

    const [, token] = authorization?.split(' ');

    verify(token, authConfig.jwt.secret, (err, decoded) => {
      if (err) {
        throw new AppError(err.message, 403);
      }

      if (!decoded) {
        throw new AppError('Invalid JWT token', 400);
      }

      const payload = decoded as IJWTPayload;

      request.user = {
        id: payload.sub,
      };
    });

    return next();
  } catch (error) {
    console.log(error);

    throw new AppError(error.message);
  }
};

export default [tokenValidator, authMiddleware];
