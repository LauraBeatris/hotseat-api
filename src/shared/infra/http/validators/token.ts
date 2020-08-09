import { celebrate, Joi, Segments } from 'celebrate';

const tokenValidator = celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string()
      .required()
      .regex(/Bearer/),
  }).unknown(),
});

export default tokenValidator;
