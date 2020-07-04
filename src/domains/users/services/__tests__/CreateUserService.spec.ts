import FakeUsersRepository from '@domains/users/fakes/repositories/FakeUsersRepository';
import CreateUserService from '@domains/users/services/CreateUserService';
import FakeBCryptHashProvider from '@domains/users/providers/HashProvider/fakes/FakeBCryptHashProvider';
import AppError from '@shared/errors/AppError';

let usersRepository: FakeUsersRepository;
let hashProvider: FakeBCryptHashProvider;
let createUser: CreateUserService;

describe('Create User', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    hashProvider = new FakeBCryptHashProvider();
    createUser = new CreateUserService(usersRepository, hashProvider);
  });

  it('it should create an user', async () => {
    const user = await createUser.execute({
      name: 'Jackie Chan',
      email: 'Jackie Chan',
      password: 'meanless password',
    });

    expect(user).toHaveProperty('id');
  });

  it('should create two users with the same email', async () => {
    const email = 'jackiechan@test.com';

    await createUser.execute({
      name: 'Jackie Chan',
      email,
      password: 'meanless password',
    });

    await expect(
      createUser.execute({
        name: 'John Due',
        email,
        password: 'another meanless password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
