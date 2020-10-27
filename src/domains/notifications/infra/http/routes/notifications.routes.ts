import { Router } from 'express';

import NotificationsController from '@domains/notifications/infra/http/controllers/NotificationsController';

const notificationsRouter = Router();

const notificationsController = new NotificationsController();

notificationsRouter.get('/', notificationsController.index);

notificationsRouter.patch('/:id', notificationsController.update);

export default notificationsRouter;
