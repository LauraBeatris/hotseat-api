import { Router } from 'express';

import SessionsController from '@domains/users/infra/http/controllers/SessionsController';

const routes = Router();
const sessionsController = new SessionsController();

routes.post('/', sessionsController.post);

export default routes;
