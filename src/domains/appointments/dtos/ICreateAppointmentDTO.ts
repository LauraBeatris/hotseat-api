import { AppointmentType } from '@domains/appointments/infra/database/entities/Appointment';

export default interface ICreateAppointmentDTO {
  provider_id: string;
  date: Date;
  type: AppointmentType;
}
