import { celebrate, Joi, Segments } from 'celebrate';

const updateProfileValidator = celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().not().empty(),
    email: Joi.string().email().not().empty(),
    password: Joi.string().min(5),
    password_confirmation: Joi.any().valid(Joi.ref('password')),
    old_password: Joi.string().min(5),
  })
    .with('password', 'password_confirmation')
    .with('password', 'old_password'),
});

export default updateProfileValidator;
