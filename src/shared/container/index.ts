import { container } from 'tsyringe';

import '@domains/users/providers';
import './providers';

import AppointmentsRepository from '@domains/appointments/infra/database/repositories/AppointmentsRepository';
import IAppointmentsRepository from '@domains/appointments/interfaces/IAppointmentsRepository';

import UsersRepository from '@domains/users/infra/database/repositories/UsersRepository';
import IUsersRepository from '@domains/users/interfaces/IUsersRepository';

import RecoverPasswordRequestsRepository from '@domains/users/infra/database/repositories/RecoverPasswordRequestsRepository';
import IRecoverPasswordRequestsRepository from '@domains/users/interfaces/IRecoverPasswordRequestsRepository';

import INotificationsRepository from '@domains/notifications/interfaces/INotificationsRepository';
import NotificationsRepository from '@domains/notifications/infra/database/repositories/NotificationsRepository';

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IRecoverPasswordRequestsRepository>(
  'RecoverPasswordRequestsMailRepository',
  RecoverPasswordRequestsRepository,
);

container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationsRepository,
);

export default container;
