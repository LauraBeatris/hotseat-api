import Appointment from '@domains/appointments/infra/database/entities/Appointment';
import ICreateAppointmentDTO from '@domains/appointments/dtos/ICreateAppointmentDTO';

export default interface IAppointmentsRepository {
  findByDate(date: Date): Promise<Appointment | undefined>;

  create(appointmentData: ICreateAppointmentDTO): Promise<Appointment>;
}
