import { Request, Response } from 'express';

import ListProviderMonthAvailabilityService from '@domains/appointments/services/ListProviderMonthAvailabilityService';
import container from '@shared/container';

class ProviderMonthAvailabilityController {
  async index(request: Request, response: Response): Promise<Response> {
    const { month, year } = request.body;
    const { provider_id } = request.params;

    const listProviderMonthAvailabilityService = container.resolve(
      ListProviderMonthAvailabilityService,
    );

    const availability = await listProviderMonthAvailabilityService.execute({
      provider_id,
      year,
      month,
    });

    return response.json(availability);
  }
}

export default ProviderMonthAvailabilityController;
