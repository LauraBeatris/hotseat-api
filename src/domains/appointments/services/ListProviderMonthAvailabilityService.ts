import { inject, injectable } from 'tsyringe';
import { getDate, isAfter, getDaysInMonth } from 'date-fns';

import IUsersRepository from '@domains/users/interfaces/IUsersRepository';
import IAppointmentsRepository from '@domains/appointments/interfaces/IAppointmentsRepository';
import AppError from '@shared/errors/AppError';
import { MAX_APPOINTMENTS_PER_DAY } from '@domains/users/constants/appointments';
import { parseMonthToJSMonth } from '@shared/utils/month';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  async execute({ provider_id, month, year }: IRequest): Promise<IResponse> {
    const provider = await this.usersRepository.findById(provider_id);

    if (!provider) {
      throw new AppError('Provider not found', 404);
    }

    const appointments = await this.appointmentsRepository.findByMonthFromProvider(
      {
        year,
        month,
        provider_id,
      },
    );

    const numberOfDaysInMonth = getDaysInMonth(month - 1);
    const daysInMonth = Array.from(
      { length: numberOfDaysInMonth },
      (_, index) => index + 1,
    );

    const availability = daysInMonth.map(day => {
      const numberOfAppointmentsInDay = appointments.filter(
        appointment => getDate(appointment.date) === day,
      ).length;

      const availabilityDate = new Date(
        year,
        parseMonthToJSMonth(month),
        day,
        23,
        59,
        59,
      );

      const isPast = isAfter(new Date(Date.now()), availabilityDate);

      return {
        day,
        isPast,
        available:
          !isPast && numberOfAppointmentsInDay < MAX_APPOINTMENTS_PER_DAY,
      };
    });

    return availability;
  }
}

export default ListProviderMonthAvailabilityService;
