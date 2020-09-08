import { celebrate, Joi, Segments } from 'celebrate';

const resetPasswordValidator = celebrate({
  [Segments.BODY]: {
    password: Joi.string().min(5).required(),
    token: Joi.string().uuid().required(),
    confirm_password: Joi.any().valid(Joi.ref('password')).required(),
  },
});

export default resetPasswordValidator;
