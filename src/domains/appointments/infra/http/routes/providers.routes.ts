import { Router } from 'express';

import ProvidersController from '@domains/appointments/infra/http/controllers/ProvidersController';
import ProviderMonthAvailabilityController from '@domains/appointments/infra/http/controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailabilityController from '@domains/appointments/infra/http/controllers/ProviderDayAvailabilityController';

import listProviderMonthAvailabilityValidator from '@domains/appointments/infra/http/validators/listProviderMonthAvailability';
import listProviderDayAvailabilityValidator from '@domains/appointments/infra/http/validators/listProviderDayAvailability';

const routes = Router();

const providersController = new ProvidersController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();

routes.get('/', providersController.index);
routes.get(
  '/:provider_id/month-availability',
  listProviderMonthAvailabilityValidator,
  providerMonthAvailabilityController.index,
);
routes.get(
  '/:provider_id/day-availability',
  listProviderDayAvailabilityValidator,
  providerDayAvailabilityController.index,
);

export default routes;
