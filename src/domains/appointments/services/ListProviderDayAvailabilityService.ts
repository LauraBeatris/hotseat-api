import { inject, injectable } from 'tsyringe';
import { getHours, isAfter } from 'date-fns';

import {
  MAX_APPOINTMENTS_PER_DAY,
  BUSINESS_START_HOUR,
} from '@domains/users/constants/appointments';
import IUsersRepository from '@domains/users/interfaces/IUsersRepository';
import AppError from '@shared/errors/AppError';
import IAppointmentsRepository from '../interfaces/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
class ListProviderDayAvailabilityService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  async execute({
    provider_id,
    day,
    month,
    year,
  }: IRequest): Promise<IResponse> {
    const provider = await this.usersRepository.findById(provider_id);

    if (!provider) {
      throw new AppError('Provider not found', 404);
    }

    const appointments = await this.appointmentsRepository.findByDayFromProvider(
      {
        provider_id,
        day,
        month,
        year,
      },
    );

    const businessHoursArray = Array.from(
      { length: MAX_APPOINTMENTS_PER_DAY },
      (_, index) => index + BUSINESS_START_HOUR,
    );

    const availability = businessHoursArray.map(hour => {
      const hasAppointmentInThisHour = appointments.find(
        appointment => getHours(appointment.date) === hour,
      );

      const choosedDate = new Date(year, month - 1, day, hour);
      const currentDate = new Date(Date.now());

      return {
        hour,
        available:
          !hasAppointmentInThisHour && isAfter(choosedDate, currentDate),
      };
    });

    return availability;
  }
}

export default ListProviderDayAvailabilityService;
