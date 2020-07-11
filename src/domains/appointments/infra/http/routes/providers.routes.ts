import { Router } from 'express';
import ProvidersController from '../controllers/ProvidersController';

const routes = Router();
const providersController = new ProvidersController();

routes.get('/', providersController.index);

export default routes;
