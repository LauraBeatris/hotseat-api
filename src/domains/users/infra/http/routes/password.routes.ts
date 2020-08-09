import { Router } from 'express';

import RecoverPasswordRequestController from '@domains/users/infra/http/controllers/RecoverPasswordRequestController';
import ResetPasswordController from '@domains/users/infra/http/controllers/ResetPasswordController';

import recoverPasswordRequestValidator from '@domains/users/infra/http/validators/recoverPasswordRequest';
import resetPasswordValidator from '@domains/users/infra/http/validators/resetPassword';

const passwordRouter = Router();

const recoverPasswordRequestController = new RecoverPasswordRequestController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post(
  '/recover-request',
  recoverPasswordRequestValidator,
  recoverPasswordRequestController.create,
);
passwordRouter.patch(
  '/reset',
  resetPasswordValidator,
  resetPasswordController.update,
);

export default passwordRouter;
