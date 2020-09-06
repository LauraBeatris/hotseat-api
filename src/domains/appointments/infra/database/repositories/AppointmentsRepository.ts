import { Repository, getRepository, Raw } from 'typeorm';

import IAppointmentsRepository from '@domains/appointments/interfaces/IAppointmentsRepository';
import Appointment from '@domains/appointments/infra/database/entities/Appointment';
import ICreateAppointmentDTO from '@domains/appointments/dtos/ICreateAppointmentDTO';
import IFindByMonthFromProviderDTO from '@domains/appointments/dtos/IFindByMonthFromProviderDTO';
import IFindByDayFromProviderDTO from '@domains/appointments/dtos/IFindByDayFromProviderDTO';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async create(
    appointmentData: ICreateAppointmentDTO,
  ): Promise<Appointment> {
    const appointment = this.ormRepository.create(appointmentData);

    await this.ormRepository.save(appointment);

    return appointment;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: {
        date,
      },
    });

    return findAppointment;
  }

  public async find(): Promise<Appointment[]> {
    const appointments = await this.ormRepository.find();

    return appointments;
  }

  public async findByMonthFromProvider({
    provider_id,
    year,
    month,
  }: IFindByMonthFromProviderDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0');

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`,
        ),
      },
    });

    return appointments;
  }

  public async findByDayFromProvider({
    provider_id,
    day,
    month,
    year,
  }: IFindByDayFromProviderDTO): Promise<Appointment[]> {
    const parsedDay = String(day).padStart(2, '0');
    const parsedMonth = String(month).padStart(2, '0');

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
        ),
      },
      relations: ['customer'],
    });

    return appointments;
  }
}

export default AppointmentsRepository;
