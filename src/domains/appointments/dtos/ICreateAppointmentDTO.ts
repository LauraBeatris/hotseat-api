import { AppointmentType } from '@domains/appointments/enums/appointmentTypes';

export default interface ICreateAppointmentDTO {
  provider_id: string;
  customer_id: string;
  date: Date;
  type: AppointmentType;
}
