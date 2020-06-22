import { Router } from 'express';

import UsersController from '@domains/users/infra/http/controllers/UsersController';
import UserAvatarController from '@domains/users/infra/http/controllers/UserAvatarController';
import verifyAuthentication from '@shared/infra/http/middlewares/verifyAuthentication';
import upload from '@shared/infra/http/middlewares/upload';

const routes = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

routes.post('/', usersController.create);

routes.patch(
  '/avatar',
  verifyAuthentication,
  upload.single('avatar'),
  userAvatarController.update,
);

export default routes;
