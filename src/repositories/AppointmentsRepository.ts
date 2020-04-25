import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

interface CreateAppointmentDTO {
  provider: string;
  date: Date;
  type: string;
}

class AppointmentRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  findByDate(date: Date): Appointment | null {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(date, appointment.date),
    );

    return findAppointment || null;
  }

  public all(): Appointment[] {
    return this.appointments;
  }

  public create({ provider, date, type }: CreateAppointmentDTO): Appointment {
    const appointment = new Appointment({ provider, date, type });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentRepository;
