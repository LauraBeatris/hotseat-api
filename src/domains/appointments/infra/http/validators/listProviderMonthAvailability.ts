import { celebrate, Joi, Segments } from 'celebrate';

const listProviderMonthAvailabilityValidator = celebrate({
  [Segments.QUERY]: {
    month: Joi.number().integer().positive().required(),
    year: Joi.number().integer().positive().required(),
  },
});

export default listProviderMonthAvailabilityValidator;
