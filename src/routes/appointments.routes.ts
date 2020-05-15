import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (_, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  const { provider, date, type } = request.body;

  if (!provider || !date || !type)
    return response
      .status(400)
      .json({ error: 'Invalid data, some fields are missing!' });

  const parsedDate = parseISO(date);

  try {
    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({
      provider,
      date: parsedDate,
      type,
    });

    return response.json(appointment);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default appointmentsRouter;
