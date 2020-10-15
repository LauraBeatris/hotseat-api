import { celebrate, Joi, Segments } from 'celebrate';

const refreshTokenValidator = celebrate({
  [Segments.BODY]: {
    refreshToken: Joi.string().required(),
  },
});

export default refreshTokenValidator;
