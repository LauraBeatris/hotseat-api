import { Router } from 'express';
import CreateUserService from '@domains/users/services/CreateUserService';

import verifyAuthentication from '@shared/infra/http/middlewares/verifyAuthentication';
import upload from '@shared/infra/http/middlewares/upload';
import UploadAvatarService from '@domains/users/services/UploadAvatarService';

const routes = Router();

routes.post('/', async (request, response) => {
  try {
    const createUserService = new CreateUserService();

    const { name, email, password } = request.body;
    const user = await createUserService.execute({ name, email, password });

    delete user.password;

    return response.json(user);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

routes.patch(
  '/avatar',
  verifyAuthentication,
  upload.single('avatar'),
  async (request, response) => {
    const { id: user_id } = request.user;
    const avatarFileName = request.file?.filename;

    if (!avatarFileName) {
      return response.status(400).json({ error: 'Please, send a avatar file' });
    }

    const uploadAvatarService = new UploadAvatarService();

    const userWithAvatar = await uploadAvatarService.execute({
      user_id,
      avatarFileName,
    });

    delete userWithAvatar.password;

    return response.json(userWithAvatar);
  },
);

export default routes;
