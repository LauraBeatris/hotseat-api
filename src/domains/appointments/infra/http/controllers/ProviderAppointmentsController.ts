import { Request, Response } from 'express';
import container from '@shared/container';

import Appointments from '@domains/appointments/infra/database/entities/Appointment';
import ListProviderAppointmentsService from '@domains/appointments/services/ListProviderAppointmentsService';

class ProviderAppointmentsController {
  async index(
    request: Request,
    response: Response,
  ): Promise<Response<Appointments[]>> {
    const { day, year, month } = request.query;
    const provider_id = request.user.id;

    const listProviderAppointments = container.resolve(
      ListProviderAppointmentsService,
    );

    const appointments = await listProviderAppointments.execute({
      day: Number(day),
      year: Number(year),
      month: Number(month),
      provider_id,
    });

    return response.json(appointments);
  }
}

export default ProviderAppointmentsController;
