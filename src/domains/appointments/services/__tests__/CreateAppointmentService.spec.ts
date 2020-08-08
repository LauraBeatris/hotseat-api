import { uuid } from 'uuidv4';

import FakeAppointmentsRepository from '@domains/appointments/fakes/repositories/FakeAppointmentsRepository';
import FakeNotificationsRepository from '@domains/notifications/fakes/repositories/FakeNotificationsRepository';
import Appointment from '@domains/appointments/infra/database/entities/Appointment';
import CreateAppointmentService from '@domains/appointments/services/CreateAppointmentService';
import AppError from '@shared/errors/AppError';
import {
  BUSINESS_LIMIT_HOUR,
  BUSINESS_START_HOUR,
} from '@domains/users/constants/appointments';

let appointmentsRepository: FakeAppointmentsRepository;
let notificationsRepository: FakeNotificationsRepository;
let createAppointment: CreateAppointmentService;

describe('Create Appointment', () => {
  beforeEach(() => {
    appointmentsRepository = new FakeAppointmentsRepository();

    notificationsRepository = new FakeNotificationsRepository();

    createAppointment = new CreateAppointmentService(
      appointmentsRepository,
      notificationsRepository,
    );
  });

  it('should create an appointment', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 1, 1, 14, 0, 0).getTime());

    const appointment = await createAppointment.execute({
      provider_id: 'meanless provider id',
      customer_id: 'meanless customer id',
      type: 'CLASSIC_SHAVING',
      date: new Date(2020, 1, 1, 15, 0, 0),
    });

    expect(appointment).toHaveProperty('id');
  });

  it('should not create two appointments with the same date', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 1, 1, 14, 0, 0).getTime());

    const appointmentData = Object.assign(new Appointment(), {
      provider_id: 'meanless provider id',
      customer_id: 'meanless customer id',
      type: 'CLASSIC_SHAVING',
      date: new Date(2020, 1, 1, 15, 0, 0),
    });

    await createAppointment.execute(appointmentData);

    await expect(
      createAppointment.execute(appointmentData),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not allow a provider to book an appointment with himself', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 1, 1, 14, 0, 0).getTime());

    const providerId = uuid();

    await expect(
      createAppointment.execute({
        provider_id: providerId,
        customer_id: providerId,
        date: new Date(2020, 1, 1, 15, 0, 0),
        type: 'CLASSIC_SHAVING',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not allow to book an appointment in past dates', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 1, 1, 14, 0, 0).getTime());

    await expect(
      createAppointment.execute({
        provider_id: 'meanless provider id',
        customer_id: 'meanless customer id',
        date: new Date(2020, 1, 1, 13, 0, 0),
        type: 'CLASSIC_SHAVING',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not allow to book an appointment before or after the business hours range', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 0, 1, 14, 0, 0).getTime());

    await expect(
      createAppointment.execute({
        customer_id: 'meanless customer id',
        provider_id: 'meanless provider id',
        date: new Date(2020, 1, 1, BUSINESS_START_HOUR - 1, 0, 0),
        type: 'CLASSIC_SHAVING',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        customer_id: 'meanless customer id',
        provider_id: 'meanless provider id',
        date: new Date(2020, 1, 1, BUSINESS_LIMIT_HOUR + 1, 0, 0),
        type: 'HAIR_WASHING',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should send a notification to the provider after creating an appointment', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 0, 1, 14, 0, 0).getTime());

    const createNotification = jest.spyOn(notificationsRepository, 'create');

    await createAppointment.execute({
      customer_id: 'meanless customer id',
      provider_id: 'meanless provider id',
      date: new Date(2020, 1, 1, BUSINESS_LIMIT_HOUR, 0, 0),
      type: 'CLASSIC_SHAVING',
    });

    expect(createNotification).toHaveBeenCalledWith();
  });
});
