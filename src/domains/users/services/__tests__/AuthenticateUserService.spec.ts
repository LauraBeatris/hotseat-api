import FakeUsersRepository from '@domains/users/fakes/repositories/FakeUsersRepository';
import FakeBCryptHashProvider from '@domains/users/providers/HashProvider/fakes/FakeBCryptHashProvider';
import AuthenticateUserService from '@domains/users/services/AuthenticateUserService';
import AppError from '@shared/errors/AppError';

let usersReposistory: FakeUsersRepository;
let hashProvider: FakeBCryptHashProvider;
let authenticateUserService: AuthenticateUserService;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersReposistory = new FakeUsersRepository();
    hashProvider = new FakeBCryptHashProvider();
    authenticateUserService = new AuthenticateUserService(
      usersReposistory,
      hashProvider,
    );
  });

  it('should authenticate an user', async () => {
    const userData = {
      name: 'Jackie Chan',
      email: 'jackiechan@test.com',
      password: 'meanless password',
    };

    const user = await usersReposistory.create(userData);
    const authPayload = await authenticateUserService.execute(user);

    expect(authPayload).toHaveProperty('token');
    expect(authPayload).toHaveProperty('user');
  });

  it('should not authenticate an unexisting user', () => {
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
    const userData = {
      name: 'Jackie Chan',
      email: 'jackiechan@test.com',
      password: 'meanless password',
    };

    expect(
      authenticateUserService.execute({
        ...userData,
        password: 'password that not matches',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
