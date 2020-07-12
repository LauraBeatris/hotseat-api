import { Router } from 'express';

import ProvidersController from '../controllers/ProvidersController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';

const routes = Router();

const providersController = new ProvidersController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();

routes.get('/', providersController.index);
routes.get(
  '/:provider_id/month-availability',
  providerMonthAvailabilityController.index,
);
routes.get(
  '/:provider_id/day-availability',
  providerDayAvailabilityController.index,
);

export default routes;
