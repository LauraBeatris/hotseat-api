import FakeUsersRepository from '@domains/users/fakes/repositories/FakeUsersRepository';
import CreateUserService from '@domains/users/services/CreateUserService';
import FakeBCryptHashProvider from '@domains/users/providers/HashProvider/fakes/FakeBCryptHashProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import AppError from '@shared/errors/AppError';

let usersRepository: FakeUsersRepository;
let cacheProvider: FakeCacheProvider;
let hashProvider: FakeBCryptHashProvider;
let createUser: CreateUserService;

describe('Create User', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    cacheProvider = new FakeCacheProvider();
    hashProvider = new FakeBCryptHashProvider();
    createUser = new CreateUserService(
      usersRepository,
      hashProvider,
      cacheProvider,
    );
  });

  it('it should create an user', async () => {
    const user = await createUser.execute({
      name: 'Jackie Chan',
      email: 'Jackie Chan',
      password: 'meaningless password',
    });

    expect(user).toHaveProperty('id');
  });

  it('should create two users with the same email', async () => {
    const email = 'jackiechan@test.com';

    await createUser.execute({
      name: 'Jackie Chan',
      email,
      password: 'meaningless password',
    });

    await expect(
      createUser.execute({
        name: 'John Due',
        email,
        password: 'another meaningless password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should invalidate the providers list cache if a new provider is registered', async () => {
    const invalidateByPrefix = jest.spyOn(cacheProvider, 'invalidateByPrefix');

    await createUser.execute({
      name: 'Jackie Chan Provider',
      email: 'jackiechanprovider@gmail.com',
      password: 'meaningless password',
      is_provider: true,
    });

    expect(invalidateByPrefix).toHaveBeenCalled();
  });
});
