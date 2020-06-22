import { Router } from 'express';

import AuthenticateUserService from '@domains/users/services/AuthenticateUserService';
import container from '@shared/container';

const routes = Router();

routes.post('/', async (request, response) => {
  const { email, password } = request.body;

  try {
    const authenticateUserService = container.resolve(AuthenticateUserService);

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
