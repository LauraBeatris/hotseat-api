import { Router } from 'express';

import usersRoutes from '@domains/users/infra/http/routes/users.routes';
import sessionsRoutes from '@domains/users/infra/http/routes/sessions.routes';
import appointmentsRoutes from '@domains/appointments/infra/http/routes/appointments.routes';

import authMiddleware from '@shared/infra/http/middlewares/verifyAuthentication';

const routes = Router();

routes.use('/sessions', sessionsRoutes);
routes.use('/users', usersRoutes);

routes.use(authMiddleware);
routes.use('/appointments', appointmentsRoutes);

export default routes;
