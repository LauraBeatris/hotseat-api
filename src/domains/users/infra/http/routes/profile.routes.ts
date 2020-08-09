import { Router } from 'express';

import ProfileController from '@domains/users/infra/http/controllers/ProfileController';
import updateProfileValidator from '@domains/users/infra/http/validators/updateProfile';

const routes = Router();
const profileController = new ProfileController();

routes.get('/', profileController.show);
routes.put('/', updateProfileValidator, profileController.update);

export default routes;
