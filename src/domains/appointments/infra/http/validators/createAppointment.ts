import { celebrate, Joi, Segments } from 'celebrate';
import APPOINTMENT_TYPES from '@domains/appointments/enums/appointmentTypes';

const createAppointmentValidator = celebrate({
  [Segments.BODY]: {
    type: Joi.string()
      .valid(...APPOINTMENT_TYPES)
      .required(),
    date: Joi.date(),
    provider_id: Joi.string().uuid().required(),
  },
});

export default createAppointmentValidator;
