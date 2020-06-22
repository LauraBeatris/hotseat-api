import { getCustomRepository, getRepository } from 'typeorm';
import { startOfHour } from 'date-fns';

import Appointment, {
  AppointmentType,
} from '@domains/appointments/infra/database/entities/Appointment';
import AppointmentRepository from '@domains/appointments/infra/database/repositories/AppointmentsRepository';
import User from '@domains/users/infra/database/entities/User';
import AppError from '@shared/errors/AppError';

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
