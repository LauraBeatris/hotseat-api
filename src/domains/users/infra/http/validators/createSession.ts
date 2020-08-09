import { celebrate, Joi, Segments } from 'celebrate';

const createSessionValidator = celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
  },
});

export default createSessionValidator;
