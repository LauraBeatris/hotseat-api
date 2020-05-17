import { Router } from 'express';

import usersRoutes from './users.routes';
import appointmentsRoutes from './appointments.routes';
import sessionsRoutes from './sessions.routes';

import authMiddleware from '../middlewares/auth';

const routes = Router();

routes.use('/sessions', sessionsRoutes);

routes.use(authMiddleware);
routes.use('/users', usersRoutes);
routes.use('/appointments', appointmentsRoutes);

export default routes;
