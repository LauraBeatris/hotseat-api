import { Request, Response } from 'express';
import { parseISO } from 'date-fns';

import Appointment from '@domains/appointments/infra/database/entities/Appointment';
import AppointmentsRepository from '@domains/appointments/infra/database/repositories/AppointmentsRepository';
import CreateAppointmentService from '@domains/appointments/services/CreateAppointmentService';
import AppError from '@shared/errors/AppError';
import container from '@shared/container';

export default class AppointmentsController {
  public async index(
    _: Request,
    response: Response,
  ): Promise<Response<Appointment[]>> {
    const appointmentsRepository = new AppointmentsRepository();
    const appointments = await appointmentsRepository.find();

    return response.json(appointments);
  }

  public async create(
    request: Request,
    response: Response,
  ): Promise<Response<Appointment>> {
    const { provider_id, date, type } = request.body;
    const customer_id = request.user.id;

    if (!provider_id || !date || !type) {
      throw new AppError('Invalid data, some fields are missing!');
    }

    const parsedDate = parseISO(date);

    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      provider_id,
      customer_id,
      date: parsedDate,
      type,
    });

    return response.json(appointment);
  }
}
