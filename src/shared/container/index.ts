import { container } from 'tsyringe';

import AppointmentsRepository from '@domains/appointments/infra/database/repositories/AppointmentsRepository';
import IAppointmentsRepository from '@domains/appointments/interfaces/IAppointmentsRepository';

import UsersRepository from '@domains/users/infra/database/repositories/UsersRepository';
import IUsersRepository from '@domains/users/interfaces/IUsersRepository';

import '@domains/users/providers';

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

export default container;
