import 'reflect-metadata';
import { uuid } from 'uuidv4';
import CreateAppointmentService from '@domains/appointments/services/CreateAppointmentService';
import AppointmentsRepository from '@domains/appointments/fakes/repositories/AppointmentRepository';
import AppError from '@shared/errors/AppError';
import Appointment from '@domains/appointments/infra/database/entities/Appointment';

describe('Create Appointment', () => {
  it('should create an appointment', async () => {
    const appointmentsRepository = new AppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      appointmentsRepository,
    );

    const appointment = await createAppointment.execute({
      provider_id: uuid(),
      type: 'CLASSIC_SHAVING',
      date: new Date(),
    });

    expect(appointment).toHaveProperty('id');
  });

  it('should two appointments with the same date', async () => {
    const appointmentsRepository = new AppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      appointmentsRepository,
    );

    const appointmentData = Object.assign(new Appointment(), {
      provider_id: uuid(),
      type: 'CLASSIC_SHAVING',
      date: new Date(),
    });

    await createAppointment.execute(appointmentData);

    expect(createAppointment.execute(appointmentData)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
