import FakeUsersRepository from '@domains/users/fakes/repositories/FakeUsersRepositories';
import CreateUserService from '@domains/users/services/CreateUserService';
import FakeBCryptHashProvider from '@domains/users/providers/HashProvider/fakes/FakeBCryptHashProvider';
import AppError from '@shared/errors/AppError';

describe('Create User', () => {
  it('it should create an user', async () => {
    const usersRepository = new FakeUsersRepository();
    const hashProvider = new FakeBCryptHashProvider();
    const createUser = new CreateUserService(usersRepository, hashProvider);

    const user = await createUser.execute({
      name: 'Jackie Chan',
      email: 'Jackie Chan',
      password: 'meanless password',
    });

    expect(user).toHaveProperty('id');
  });

  it('should create two users with the same email', async () => {
    const usersRepository = new FakeUsersRepository();
    const hashProvider = new FakeBCryptHashProvider();
    const createUser = new CreateUserService(usersRepository, hashProvider);

    const email = 'jackiechan@test.com';

    await createUser.execute({
      name: 'Jackie Chan',
      email,
      password: 'meanless password',
    });

    expect(
      createUser.execute({
        name: 'John Due',
        email,
        password: 'another meanless password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
