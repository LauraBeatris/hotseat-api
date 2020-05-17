import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';

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

export default routes;
