import { container } from 'tsyringe';
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';
import IHashProvider from './HashProvider/interfaces/IHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);

export default container;
