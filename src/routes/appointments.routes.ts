import { Router } from 'express';
import { parseISO, startOfHour } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';

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

  const parsedDate = startOfHour(parseISO(date));

  const appointmentInTheSameDate = appointmentsRepository.findByDate(
    parsedDate,
  );

  if (appointmentInTheSameDate)
    return response
      .status(400)
      .json({ error: "There's already a appointment booked in that date" });

  const appointment = appointmentsRepository.create({
    provider,
    date: parsedDate,
    type,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
