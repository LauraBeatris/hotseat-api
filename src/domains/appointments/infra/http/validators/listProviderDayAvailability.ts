import { celebrate, Joi, Segments } from 'celebrate';

const listProviderDayAvailability = celebrate({
  [Segments.QUERY]: {
    day: Joi.number().integer().positive().required(),
    month: Joi.number().integer().positive().required(),
    year: Joi.number().integer().positive().required(),
  },
});

export default listProviderDayAvailability;
