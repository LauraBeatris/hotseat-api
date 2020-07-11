import FakeUsersRepository from '@domains/users/fakes/repositories/FakeUsersRepository';
import ShowProfileService from '@domains/users/services/ShowProfileService';
import AppError from '@shared/errors/AppError';

let usersReposistory: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe('Show Profile', () => {
  beforeEach(() => {
    usersReposistory = new FakeUsersRepository();
    showProfileService = new ShowProfileService(usersReposistory);
  });

  it('should show the user data in the profile', async () => {
    const user = await usersReposistory.create({
      name: 'Jackie Chan',
      email: 'jackiechan@test.com',
      password: 'meaningless password',
    });

    const profile = await showProfileService.execute({ user_id: user.id });

    expect(profile?.name).toBe(user.name);
  });

  it('should not show the profile of an unexisting user', async () => {
    await expect(
      showProfileService.execute({ user_id: 'unexisting user id' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
