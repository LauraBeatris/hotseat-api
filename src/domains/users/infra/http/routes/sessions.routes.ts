import { Router } from 'express';

import SessionsController from '@domains/users/infra/http/controllers/SessionsController';

import createSessionValidator from '@domains/users/infra/http/validators/createSession';

const routes = Router();
const sessionsController = new SessionsController();

routes.post('/', createSessionValidator, sessionsController.post);

export default routes;
