import { Router } from 'express';

import UsersController from '@domains/users/infra/http/controllers/UsersController';
import UserAvatarController from '@domains/users/infra/http/controllers/UserAvatarController';
import authMiddleware from '@shared/infra/http/middlewares/auth';
import upload from '@shared/infra/http/middlewares/upload';

import createUserValidator from '@domains/users/infra/http/validators/createUser';

const routes = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

routes.post('/', createUserValidator, usersController.create);

routes.patch(
  '/avatar',
  authMiddleware,
  upload.single('avatar'),
  userAvatarController.update,
);

export default routes;
