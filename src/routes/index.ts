import { Router } from 'express';
import usersRoutes from './users.routes';
import appointmentsRoutes from './appointments.routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/appointments', appointmentsRoutes);

export default routes;
