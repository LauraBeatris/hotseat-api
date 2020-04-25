import { startOfHour } from 'date-fns';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  provider: string;
  date: Date;
  type: string;
}

class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ provider, date, type }: Request): Appointment {
    const appointmentDate = startOfHour(date);

    const appointmentInTheSameDate = this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (appointmentInTheSameDate)
      throw Error("There's already a appointment booked in that date");

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
      type,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
