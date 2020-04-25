import { Router } from 'express';
import { uuid } from 'uuidv4';
import { parseISO, startOfHour, isEqual } from 'date-fns';

const appointmentsRouter = Router();

interface Appointment {
  id: string;
  provider: string;
  date: Date;
  type: string;
}

const appointments: Appointment[] = [];

appointmentsRouter.get('/', (_, response) => response.json(appointments));

appointmentsRouter.post('/', (request, response) => {
  const { provider, date, type } = request.body;

  if (!provider || !date || !type)
    return response
      .status(400)
      .json({ error: 'Invalid data, some fields are missing!' });

  const parsedDate = startOfHour(parseISO(date));

  const appointmentInTheSameDate = appointments.find(appointment =>
    isEqual(parsedDate, appointment.date),
  );

  if (appointmentInTheSameDate)
    return response
      .status(400)
      .json({ error: "There's already a appointment booked in that date" });

  const appointment = {
    id: uuid(),
    provider,
    date: parsedDate,
    type,
  };

  appointments.push(appointment);

  return response.json(appointment);
});

export default appointmentsRouter;
