import FakeRecoverPasswordRequestsRepository from '@domains/users/fakes/repositories/FakeRecoverPasswordRequestsRepository';
import FakeUsersRepository from '@domains/users/fakes/repositories/FakeUsersRepository';
import ResetUserPasswordService from '@domains/users/services/ResetUserPasswordService';

let usersRepository: FakeUsersRepository;
let recoverPasswordRequestsRepository: FakeRecoverPasswordRequestsRepository;

let resetPasswordService: ResetUserPasswordService;

describe('Reset User Password', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    recoverPasswordRequestsRepository = new FakeRecoverPasswordRequestsRepository();

    resetPasswordService = new ResetUserPasswordService(
      recoverPasswordRequestsRepository,
      usersRepository,
    );
  });

  it('should be able to reset the user password', async () => {
    const { id } = await usersRepository.create({
      name: 'Jackie Chan',
      email: 'jackiechan@test.com',
      password: 'meanless password',
    });

    const recoverPasswordRequest = await recoverPasswordRequestsRepository.create(
      id,
    );

    const newPassword = 'meanless new password';

    await resetPasswordService.execute({
      token: recoverPasswordRequest.token,
      password: newPassword,
    });

    const updatedUser = await usersRepository.findById(id);

    expect(updatedUser?.password).toBe(newPassword);
  });
});
