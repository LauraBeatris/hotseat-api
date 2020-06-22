import { Router } from 'express';

import UsersRepository from '@domains/users/infra/database/repositories/UsersRepository';
import AuthenticateUserService from '@domains/users/services/AuthenticateUserService';

const routes = Router();

routes.post('/', async (request, response) => {
  const { email, password } = request.body;

  try {
    const usersRepository = new UsersRepository();
    const authenticateUserService = new AuthenticateUserService(
      usersRepository,
    );

    const { user, token } = await authenticateUserService.execute({
      email,
      password,
    });

    delete user.password;

    return response.json({ user, token });
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default routes;
