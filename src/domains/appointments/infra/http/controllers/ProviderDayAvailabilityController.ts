import { Request, Response } from 'express';

import ListProviderDayAvailabilityService from '@domains/appointments/services/ListProviderDayAvailabilityService';
import container from '@shared/container';

class ProviderDayAvailabilityController {
  async index(request: Request, response: Response): Promise<Response> {
    const { year, month, day } = request.body;
    const { provider_id } = request.params;

    const listProviderDayAvailabilityService = container.resolve(
      ListProviderDayAvailabilityService,
    );

    const availability = await listProviderDayAvailabilityService.execute({
      provider_id,
      year,
      month,
      day,
    });

    return response.json(availability);
  }
}

export default ProviderDayAvailabilityController;
