import { sign } from 'jsonwebtoken';

import jwtConfig from '@config/auth';

/**
 * Create the authentication tokens with a given user id
 *
 * @param userId The user id
 */
const createTokens = async (
  userId: string,
  userPassword: string,
): Promise<string[]> => {
  const createToken = sign(
    {
      sub: userId,
    },
    jwtConfig.jwt.tokenSecret,
    {
      expiresIn: jwtConfig.jwt.tokenExpiresIn,
    },
  );

  const createRefreshToken = sign(
    {
      sub: userId,
    },
    jwtConfig.jwt.refreshTokenSecret + userPassword,
    {
      expiresIn: jwtConfig.jwt.refreshTokenExpiresIn,
    },
  );

  return Promise.all([createToken, createRefreshToken]);
};

export default createTokens;
