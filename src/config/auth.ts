import {
  JWT_EXPIRES_IN,
  DEFAULT_APP_SECRET,
} from '@shared/constants/authentication';

export default {
  jwt: {
    expiresIn: JWT_EXPIRES_IN,
    secret: process.env.APP_SECRET || DEFAULT_APP_SECRET,
  },
};
