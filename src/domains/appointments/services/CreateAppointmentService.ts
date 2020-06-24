import { injectable, inject } from 'tsyringe';
import { startOfHour } from 'date-fns';

import Appointment, {
  AppointmentType,
} from '@domains/appointments/infra/database/entities/Appointment';
import AppError from '@shared/errors/AppError';
import IAppointmentsRepository from '@domains/appointments/interfaces/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  date: Date;
  type: AppointmentType;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

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

    const appointment = this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
      type,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
