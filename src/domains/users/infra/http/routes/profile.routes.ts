import { Router } from 'express';

import ProfileController from '@domains/users/infra/http/controllers/ProfileController';

const routes = Router();
const profileController = new ProfileController();

routes.get('/', profileController.show);
routes.put('/', profileController.update);

export default routes;
