import { isEqual } from 'date-fns';
import { uuid } from 'uuidv4';

import IAppointmentsRepository from '@domains/appointments/interfaces/IAppointmentsRepository';
import Appointment from '@domains/appointments/infra/database/entities/Appointment';
import ICreateAppointmentDTO from '@domains/appointments/dtos/ICreateAppointmentDTO';

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  async findByDate(date: Date): Promise<Appointment | undefined> {
    const foundAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );

    return foundAppointment;
  }

  async create({
    provider_id,
    type,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = Object.assign(new Appointment(), {
      id: uuid(),
      provider_id,
      type,
      date,
    });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
