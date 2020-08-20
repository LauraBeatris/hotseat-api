import { getDate, getYear, isEqual } from 'date-fns';
import { uuid } from 'uuidv4';

import IAppointmentsRepository from '@domains/appointments/interfaces/IAppointmentsRepository';
import Appointment from '@domains/appointments/infra/database/entities/Appointment';
import ICreateAppointmentDTO from '@domains/appointments/dtos/ICreateAppointmentDTO';
import IFindByMonthFromProviderDTO from '@domains/appointments/dtos/IFindByMonthFromProviderDTO';
import IFindByDayFromProviderDTO from '@domains/appointments/dtos/IFindByDayFromProviderDTO';
import getMonth from '@shared/utils/month';

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async create({
    provider_id,
    customer_id,
    type,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = Object.assign(new Appointment(), {
      id: uuid(),
      provider_id,
      customer_id,
      type,
      date,
    });

    this.appointments.push(appointment);

    return appointment;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const foundAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );

    return foundAppointment;
  }

  public async findByMonthFromProvider({
    provider_id,
    year,
    month,
  }: IFindByMonthFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) === month &&
        getYear(appointment.date) === year,
    );

    return appointments;
  }

  public async findByDayFromProvider({
    provider_id,
    day,
    month,
    year,
  }: IFindByDayFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        getDate(appointment.date) === day &&
        getMonth(appointment.date) === month &&
        getYear(appointment.date) === year,
    );

    return appointments;
  }
}

export default AppointmentsRepository;
