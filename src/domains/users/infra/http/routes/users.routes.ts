import { Router } from 'express';
import CreateUserService from '@domains/users/services/CreateUserService';

import verifyAuthentication from '@shared/infra/http/middlewares/verifyAuthentication';
import upload from '@shared/infra/http/middlewares/upload';
import UploadAvatarService from '@domains/users/services/UploadAvatarService';
import UsersRepository from '@domains/users/infra/database/repositories/UsersRepository';

const routes = Router();

routes.post('/', async (request, response) => {
  try {
    const usersRepository = new UsersRepository();
    const createUserService = new CreateUserService(usersRepository);

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

    const usersRepository = new UsersRepository();
    const uploadAvatarService = new UploadAvatarService(usersRepository);

    const userWithAvatar = await uploadAvatarService.execute({
      user_id,
      avatarFileName,
    });

    delete userWithAvatar.password;

    return response.json(userWithAvatar);
  },
);

export default routes;
