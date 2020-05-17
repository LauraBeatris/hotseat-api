import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import AppError from '../errors/AppError';

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (_, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date, type } = request.body;

  if (!provider_id || !date || !type) {
    throw new AppError('Invalid data, some fields are missing!');
  }

  const parsedDate = parseISO(date);

  const createAppointment = new CreateAppointmentService();

  const appointment = await createAppointment.execute({
    provider_id,
    date: parsedDate,
    type,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
