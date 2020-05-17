import { getCustomRepository, getRepository } from 'typeorm';
import { startOfHour } from 'date-fns';

import Appointment, { AppointmentType } from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentsRepository';
import User from '../models/User';

import AppError from '../errors/AppError';

interface Request {
  provider_id: string;
  date: Date;
  type: AppointmentType;
}

class CreateAppointmentService {
  public async execute({
    provider_id,
    date,
    type,
  }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentRepository);

    const appointmentDate = startOfHour(date);
    const appointmentInTheSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (appointmentInTheSameDate)
      throw new AppError("There's already a appointment booked in that date");

    const providerExists = await getRepository(User).findOne({
      id: provider_id,
    });

    if (!providerExists) {
      throw new AppError("The provider doesn't exist", 404);
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
      type,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
