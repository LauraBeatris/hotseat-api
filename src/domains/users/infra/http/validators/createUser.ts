import { celebrate, Joi, Segments } from 'celebrate';

const createUserValidator = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
    is_provider: Joi.boolean().default(false),
  },
});

export default createUserValidator;
