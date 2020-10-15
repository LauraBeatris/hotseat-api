import { Router } from 'express';

import SessionsController from '@domains/users/infra/http/controllers/SessionsController';
import RefreshTokenController from '@domains/users/infra/http/controllers/RefreshTokenController';

import createSessionValidator from '@domains/users/infra/http/validators/createSession';
import refreshTokenValidator from '@domains/users/infra/http/validators/refreshToken';

const routes = Router();
const sessionsController = new SessionsController();
const refreshTokenController = new RefreshTokenController();

routes.post('/', createSessionValidator, sessionsController.create);

routes.post(
  '/refreshToken',
  refreshTokenValidator,
  refreshTokenController.create,
);

export default routes;
