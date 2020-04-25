import { Router } from 'express';
import { parseISO, startOfHour } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (_, response) =>
  response.json(appointmentsRepository.all()),
);

appointmentsRouter.post('/', (request, response) => {
  const { provider, date, type } = request.body;

  if (!provider || !date || !type)
    return response
      .status(400)
      .json({ error: 'Invalid data, some fields are missing!' });

  const parsedDate = parseISO(date);

  try {
    const createAppointment = new CreateAppointmentService(
      appointmentsRepository,
    );

    const appointment = createAppointment.execute({
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
