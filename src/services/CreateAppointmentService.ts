import { getCustomRepository } from 'typeorm';
import { startOfHour } from 'date-fns';

import Appointment, { AppointmentType } from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentsRepository';

interface Request {
  provider: string;
  date: Date;
  type: AppointmentType;
}

class CreateAppointmentService {
  public async execute({
    provider,
    date,
    type,
  }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentRepository);

    const appointmentDate = startOfHour(date);
    const appointmentInTheSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (appointmentInTheSameDate)
      throw Error("There's already a appointment booked in that date");

    const appointment = appointmentsRepository.create({
      provider,
      date: appointmentDate,
      type,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
