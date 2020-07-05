import { Router } from 'express';

import RecoverPasswordRequestController from '@domains/users/infra/http/controllers/RecoverPasswordRequestController';
import ResetPasswordController from '@domains/users/infra/http/controllers/ResetPasswordController';

const passwordRouter = Router();

const recoverPasswordRequestController = new RecoverPasswordRequestController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post(
  '/recover-request',
  recoverPasswordRequestController.create,
);
passwordRouter.patch('/reset', resetPasswordController.update);

export default passwordRouter;
