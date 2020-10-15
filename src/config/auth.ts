import {
  JWT_REFRESH_TOKEN_EXPIRES_IN,
  JWT_TOKEN_EXPIRES_IN,
} from '@shared/constants/auth';

export default {
  jwt: {
    tokenSecret: process.env.JWT_TOKEN_SECRET ?? 'secret',
    tokenExpiresIn: JWT_REFRESH_TOKEN_EXPIRES_IN,
    refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET ?? 'secret',
    refreshTokenExpiresIn: JWT_TOKEN_EXPIRES_IN,
  },
};
