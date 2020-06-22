import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '@domains/appointments/infra/database/repositories/AppointmentsRepository';
import CreateAppointmentService from '@domains/appointments/services/CreateAppointmentService';
import AppError from '@shared/errors/AppError';
import container from '@shared/container';

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (_, response) => {
  const appointmentsRepository = new AppointmentsRepository();
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date, type } = request.body;

  if (!provider_id || !date || !type) {
    throw new AppError('Invalid data, some fields are missing!');
  }

  const parsedDate = parseISO(date);

  const createAppointment = container.resolve(CreateAppointmentService);

  const appointment = await createAppointment.execute({
    provider_id,
    date: parsedDate,
    type,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
