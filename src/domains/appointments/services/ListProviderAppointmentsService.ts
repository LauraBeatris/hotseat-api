import { inject, injectable } from 'tsyringe';
import { isBefore, parseISO } from 'date-fns';
import { classToClass } from 'class-transformer';

import IAppointmentsRepository from '@domains/appointments/interfaces/IAppointmentsRepository';
import Appointment from '@domains/appointments/infra/database/entities/Appointment';
import ICacheProvider from '@shared/container/providers/CacheProvider/interfaces/ICacheProvider';
import { getProviderAppointmentsListCacheKey } from '@shared/constants/cacheKeys';
import { parseMonthToJSMonth } from '@shared/utils/month';

interface IRequest {
  day: number;
  year: number;
  month: number;
  provider_id: string;
}

interface IResponse extends Appointment {
  isPast: boolean;
}

@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  async execute({
    day,
    year,
    month,
    provider_id,
  }: IRequest): Promise<IResponse[]> {
    const appointmentsListCacheKey = getProviderAppointmentsListCacheKey(
      provider_id,
      new Date(year, parseMonthToJSMonth(month), day),
    );

    let appointments = await this.cacheProvider.get<Appointment[]>(
      appointmentsListCacheKey,
    );

    if (!appointments) {
      appointments = await this.appointmentsRepository.findByDayFromProvider({
        day,
        year,
        month,
        provider_id,
      });

      await this.cacheProvider.save<Appointment[]>(
        appointmentsListCacheKey,
        classToClass(appointments),
      );
    }

    const listAppointments = appointments.map(appointment => {
      const currentDate = new Date(Date.now());

      const parseCachedDate =
        typeof appointment.date === 'string'
          ? parseISO(appointment.date)
          : appointment.date;

      return {
        ...appointment,
        isPast: isBefore(parseCachedDate, currentDate),
      };
    });

    return listAppointments;
  }
}

export default ListProviderAppointmentsService;
