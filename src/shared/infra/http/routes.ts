import { Router } from 'express';

import usersRoutes from '@domains/users/infra/http/routes/users.routes';
import sessionsRoutes from '@domains/users/infra/http/routes/sessions.routes';
import passwordRoutes from '@domains/users/infra/http/routes/password.routes';
import profileRoutes from '@domains/users/infra/http/routes/profile.routes';
import appointmentsRoutes from '@domains/appointments/infra/http/routes/appointments.routes';
import providersRoutes from '@domains/appointments/infra/http/routes/providers.routes';
import notificationsRoutes from '@domains/notifications/infra/http/routes/notifications.routes';

import authMiddleware from '@shared/infra/http/middlewares/auth';

const routes = Router();

routes.use('/sessions', sessionsRoutes);
routes.use('/users', usersRoutes);
routes.use('/password', passwordRoutes);

routes.use(authMiddleware);
routes.use('/notifications', notificationsRoutes);
routes.use('/appointments', appointmentsRoutes);
routes.use('/profile', profileRoutes);
routes.use('/providers', providersRoutes);

export default routes;
