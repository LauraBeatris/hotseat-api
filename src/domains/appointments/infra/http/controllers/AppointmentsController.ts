import { Request, Response } from 'express';

import Appointment from '@domains/appointments/infra/typeorm/entities/Appointment';
import AppointmentsRepository from '@domains/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '@domains/appointments/services/CreateAppointmentService';
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

    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      provider_id,
      customer_id,
      date,
      type,
    });

    return response.json(appointment);
  }
}
