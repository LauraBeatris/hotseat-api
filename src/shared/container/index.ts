import { container } from 'tsyringe';

import './providers';
import './jobs';

import AppointmentsRepository from '@domains/appointments/infra/typeorm/repositories/AppointmentsRepository';
import IAppointmentsRepository from '@domains/appointments/interfaces/IAppointmentsRepository';

import UsersRepository from '@domains/users/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '@domains/users/interfaces/IUsersRepository';

import RecoverPasswordRequestsRepository from '@domains/users/infra/typeorm/repositories/RecoverPasswordRequestsRepository';
import IRecoverPasswordRequestsRepository from '@domains/users/interfaces/IRecoverPasswordRequestsRepository';

import INotificationsRepository from '@domains/notifications/interfaces/INotificationsRepository';
import NotificationsRepository from '@domains/notifications/infra/typeorm/repositories/NotificationsRepository';

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
