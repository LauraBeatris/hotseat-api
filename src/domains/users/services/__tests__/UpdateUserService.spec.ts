import FakeUsersRepository from '@domains/users/fakes/repositories/FakeUsersRepository';
import FakeBCryptHashProvider from '@domains/users/providers/HashProvider/fakes/FakeBCryptHashProvider';
import UpdateUserService from '@domains/users/services/UpdateUserService';

import AppError from '@shared/errors/AppError';

let usersRepository: FakeUsersRepository;

let hashProvider: FakeBCryptHashProvider;

let updateUserService: UpdateUserService;

describe('Update User', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();

    hashProvider = new FakeBCryptHashProvider();

    updateUserService = new UpdateUserService(usersRepository, hashProvider);
  });

  it('should be able to update user', async () => {
    const {
      id: user_id,
      password: old_password,
    } = await usersRepository.create({
      name: 'Jackie Chan',
      email: 'jackiechan@test.com',
      password: 'meaningless password',
    });

    const updatedUserData = {
      user_id,
      name: 'Updated Jackie Chan',
      email: 'updatedjackiechan@test.com',
      old_password,
      password: 'new meaningless password',
    };

    const updatedUser = await updateUserService.execute(updatedUserData);

    expect(updatedUser.name).toBe(updatedUserData.name);
    expect(updatedUser.email).toBe(updatedUserData.email);
    expect(updatedUser.password).toBe(updatedUserData.password);
  });

  it("should not update email if it's already being used", async () => {
    const { id: user_id, name } = await usersRepository.create({
      name: 'Jackie Chan',
      email: 'jackiechan@test.com',
      password: 'meaningless password',
    });

    const { email: emailAlreadyBeingUsed } = await usersRepository.create({
      name: 'Jackie Chan Brother',
      email: 'jackiechanbrother@test.com',
      password: 'meaningless password',
    });

    await expect(
      updateUserService.execute({
        user_id,
        name,
        email: emailAlreadyBeingUsed,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password if the old one is not provided', async () => {
    const { id: user_id, name, email } = await usersRepository.create({
      name: 'Jackie Chan',
      email: 'jackiechan@test.com',
      password: 'meaningless password',
    });

    await expect(
      updateUserService.execute({
        user_id,
        name,
        email,
        password: 'meanless password that should not be saved',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not update password if the old password provided isn't valid", async () => {
    const { id: user_id, name, email } = await usersRepository.create({
      name: 'Jackie Chan',
      email: 'jackiechan@test.com',
      password: 'meaningless password',
    });

    await expect(
      updateUserService.execute({
        user_id,
        name,
        email,
        old_password: 'invalid old password',
        password: 'meanless password that should not be saved',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
