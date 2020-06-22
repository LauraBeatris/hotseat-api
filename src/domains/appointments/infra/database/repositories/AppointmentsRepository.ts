import { Repository, getRepository } from 'typeorm';

import IAppointmentsRepository from '@domains/appointments/interfaces/AppointmentsRepository';
import Appointment from '@domains/appointments/infra/database/entities/Appointment';
import ICreateAppointmentDTO from '@domains/appointments/dtos/ICreateAppointmentDTO';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: {
        date,
      },
    });

    return findAppointment;
  }

  async create(appointmentData: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create(appointmentData);

    await this.ormRepository.save(appointment);

    return appointment;
  }

  async find(): Promise<Appointment[]> {
    const appointments = await this.ormRepository.find();

    return appointments;
  }
}

export default AppointmentsRepository;
