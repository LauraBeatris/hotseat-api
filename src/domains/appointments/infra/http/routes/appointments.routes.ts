import { Router } from 'express';

import AppointmentsController from '@domains/appointments/infra/http/controllers/AppointmentsController';
import ProviderAppointmentsController from '@domains/appointments/infra/http/controllers/ProviderAppointmentsController';

import listProviderAppointmentsValidator from '@domains/appointments/infra/http/validators/listProviderAppointments';
import createAppointmentsValidator from '@domains/appointments/infra/http/validators/createAppointment';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.get('/', appointmentsController.index);

appointmentsRouter.post(
  '/',
  createAppointmentsValidator,
  appointmentsController.create,
);

appointmentsRouter.get(
  '/me',
  listProviderAppointmentsValidator,
  providerAppointmentsController.index,
);

export default appointmentsRouter;
