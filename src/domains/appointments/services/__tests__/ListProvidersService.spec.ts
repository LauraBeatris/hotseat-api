import FakeUsersRepository from '@domains/users/fakes/repositories/FakeUsersRepository';
import ListProvidersService from '../ListProvidersService';

let usersRepository: FakeUsersRepository;
let listProvidersService: ListProvidersService;

describe('List Providers', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    listProvidersService = new ListProvidersService(usersRepository);
  });

  it('should be able to list providers', async () => {
    const provider = await usersRepository.create({
      name: 'Jackie Chan Provider',
      email: 'jackiechanprovider@test.com',
      password: 'meaningless password',
      is_provider: true,
    });

    const customer = await usersRepository.create({
      name: 'Jackie Chan Customer',
      email: 'jackiechancustomer@test.com',
      password: 'meaningless password',
    });

    const providers = await listProvidersService.execute({
      expectUserId: customer.id,
    });

    expect(providers).toContainEqual(provider);
  });

  it('should not be able to list the current user as a provider', async () => {
    const user = await usersRepository.create({
      name: 'Jackie Chan',
      email: 'jackiechan@test.com',
      password: 'meaningless password',
    });

    const providers = await listProvidersService.execute({
      expectUserId: user.id,
    });

    expect(providers).not.toContain(user);
    expect(providers).toHaveLength(0);
  });
});
