import FakeUsersRepository from '@domains/users/fakes/repositories/FakeUsersRepository';
import FakeBCryptHashProvider from '@domains/users/providers/HashProvider/fakes/FakeBCryptHashProvider';
import AuthenticateUserService from '@domains/users/services/AuthenticateUserService';
import AppError from '@shared/errors/AppError';

let usersRepository: FakeUsersRepository;
let hashProvider: FakeBCryptHashProvider;
let authenticateUserService: AuthenticateUserService;

describe('Authenticate User', () => {
  beforeEach(() => {
    hashProvider = new FakeBCryptHashProvider();
    usersRepository = new FakeUsersRepository();
    authenticateUserService = new AuthenticateUserService(
      usersRepository,
      hashProvider,
    );
  });

  it('should authenticate an user', async () => {
    const userData = {
      name: 'Jackie Chan',
      email: 'jackiechan@test.com',
      password: 'meaningless password',
    };

    const user = await usersRepository.create(userData);
    const authPayload = await authenticateUserService.execute(user);

    expect(authPayload).toHaveProperty('token');
    expect(authPayload).toHaveProperty('user');
    expect(authPayload).toHaveProperty('refreshToken');
  });

  it('should not authenticate an nonexisting user', async () => {
    const userData = {
      name: 'Jackie Chan',
      email: 'jackiechan@test.com',
      password: 'meaningless password',
    };

    await expect(
      authenticateUserService.execute(userData),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not authenticate autenticate user if password not matches', async () => {
    const user = await usersRepository.create({
      name: 'Jackie Chan',
      email: 'jackiechan@test.com',
      password: 'meaningless password',
    });

    await expect(
      authenticateUserService.execute({
        ...user,
        password: 'password that not matches',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
