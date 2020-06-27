import FakeUsersRepository from '@domains/users/fakes/repositories/FakeUsersRepository';
import FakeBCryptHashProvider from '@domains/users/providers/HashProvider/fakes/FakeBCryptHashProvider';
import CreateUserService from '@domains/users/services/CreateUserService';
import AuthenticateUserService from '@domains/users/services/AuthenticateUserService';
import AppError from '@shared/errors/AppError';

describe('Authenticate User', () => {
  it('should authenticate an user', async () => {
    const usersReposistory = new FakeUsersRepository();
    const hashProvider = new FakeBCryptHashProvider();
    const createUser = new CreateUserService(usersReposistory, hashProvider);
    const authenticateUserService = new AuthenticateUserService(
      usersReposistory,
      hashProvider,
    );

    const userData = {
      name: 'Jackie Chan',
      email: 'jackiechan@test.com',
      password: 'meanless password',
    };

    await createUser.execute(userData);
    const authPayload = await authenticateUserService.execute(userData);

    expect(authPayload).toHaveProperty('token');
    expect(authPayload).toHaveProperty('user');
  });

  it('should not authenticate an unexisting user', () => {
    const usersReposistory = new FakeUsersRepository();
    const hashProvider = new FakeBCryptHashProvider();
    const authenticateUserService = new AuthenticateUserService(
      usersReposistory,
      hashProvider,
    );

    const userData = {
      name: 'Jackie Chan',
      email: 'jackiechan@test.com',
      password: 'meanless password',
    };

    expect(authenticateUserService.execute(userData)).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('should not authenticate autenticate user if password not matches', async () => {
    const usersRepository = new FakeUsersRepository();
    const hashProvider = new FakeBCryptHashProvider();
    const createUserService = new CreateUserService(
      usersRepository,
      hashProvider,
    );
    const authenticateUserService = new AuthenticateUserService(
      usersRepository,
      hashProvider,
    );

    const userData = {
      name: 'Jackie Chan',
      email: 'jackiechan@test.com',
      password: 'meanless password',
    };

    await createUserService.execute(userData);

    expect(
      authenticateUserService.execute({
        ...userData,
        password: 'password that not matches',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
