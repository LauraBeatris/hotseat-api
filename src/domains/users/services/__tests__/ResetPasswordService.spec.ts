import FakeRecoverPasswordRequestsRepository from '@domains/users/fakes/repositories/FakeRecoverPasswordRequestsRepository';
import FakeUsersRepository from '@domains/users/fakes/repositories/FakeUsersRepository';
import ResetPasswordService from '@domains/users/services/ResetPasswordService';
import FakeBCryptHashProvider from '@domains/users/providers/HashProvider/fakes/FakeBCryptHashProvider';
import AppError from '@shared/errors/AppError';
import { addHours, getMilliseconds } from 'date-fns';
import { RESET_PASSWORD_REQUEST_EXPIRES_IN_HOURS } from '@domains/users/constants/resetPassword';

let usersRepository: FakeUsersRepository;
let recoverPasswordRequestsRepository: FakeRecoverPasswordRequestsRepository;

let hashProvider: FakeBCryptHashProvider;

let resetPasswordService: ResetPasswordService;

describe('Reset User Password', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    recoverPasswordRequestsRepository = new FakeRecoverPasswordRequestsRepository();

    hashProvider = new FakeBCryptHashProvider();

    resetPasswordService = new ResetPasswordService(
      recoverPasswordRequestsRepository,
      usersRepository,
      hashProvider,
    );
  });

  it('should be able to reset the user password', async () => {
    const { id } = await usersRepository.create({
      name: 'Jackie Chan',
      email: 'jackiechan@test.com',
      password: 'meaningless password',
    });

    const recoverPasswordRequest = await recoverPasswordRequestsRepository.create(
      id,
    );

    const newPassword = 'meaningless new password';

    const generateHash = jest.spyOn(hashProvider, 'generateHash');

    await resetPasswordService.execute({
      token: recoverPasswordRequest.token,
      password: newPassword,
    });

    const updatedUser = await usersRepository.findById(id);

    expect(updatedUser?.password).toBe(newPassword);
    expect(generateHash).toBeCalledWith(updatedUser?.password);
  });

  it('should not be able to reset the password of an nonexisting request', async () => {
    await expect(
      resetPasswordService.execute({
        password: 'new meaningless  password',
        token: 'non existing request token',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password of an nonexisting user', async () => {
    const { token } = await recoverPasswordRequestsRepository.create(
      'non existing user id',
    );

    await expect(
      resetPasswordService.execute({
        password: 'new meaningless password',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password if the request is expired', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return getMilliseconds(
        addHours(Date.now(), RESET_PASSWORD_REQUEST_EXPIRES_IN_HOURS),
      );
    });

    const user = await usersRepository.create({
      name: 'Jackie Chan',
      email: 'jackiechan@test.com',
      password: 'meaningless password',
    });

    const { token } = await recoverPasswordRequestsRepository.create(user.id);

    await expect(
      resetPasswordService.execute({
        password: 'new meaningless password',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete recover password request after reseting the password', async () => {
    const user = await usersRepository.create({
      name: 'Jackie Chan',
      email: 'jackiechan@test.com',
      password: 'meaningless password',
    });

    const { token } = await recoverPasswordRequestsRepository.create(user.id);

    await resetPasswordService.execute({
      token,
      password: 'new meaningless password',
    });

    const checkIfRequestExists = await recoverPasswordRequestsRepository.findByToken(
      token,
    );

    expect(checkIfRequestExists).toBeFalsy();
  });
});
