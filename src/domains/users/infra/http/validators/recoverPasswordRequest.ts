import { celebrate, Joi, Segments } from 'celebrate';

const recoverPasswordRequestValidator = celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required(),
  },
});

export default recoverPasswordRequestValidator;
