import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

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
      throw Error('Authorization token not provided');
    }

    const [, token] = authorization?.split(' ');

    const { sub } = verify(token, authConfig.jwt.secret) as JWTPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw Error("You're not allowed to access this route");
  }
};

export default authMiddleware;
