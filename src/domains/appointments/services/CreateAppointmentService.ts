import { getRepository } from 'typeorm';
import { startOfHour } from 'date-fns';

import Appointment, {
  AppointmentType,
} from '@domains/appointments/infra/database/entities/Appointment';
import User from '@domains/users/infra/database/entities/User';
import AppError from '@shared/errors/AppError';
import IAppointmentsRepository from '@domains/appointments/interfaces/AppointmentsRepository';

interface IRequest {
  provider_id: string;
  date: Date;
  type: AppointmentType;
}

class CreateAppointmentService {
  constructor(private appointmentsRepository: IAppointmentsRepository) {}

  public async execute({
    provider_id,
    date,
    type,
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);
    const appointmentInTheSameDate = await this.appointmentsRepository.findByDate(
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

    const appointment = this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
      type,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
