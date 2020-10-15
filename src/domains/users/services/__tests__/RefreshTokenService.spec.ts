import FakeUsersRepository from '@domains/users/fakes/repositories/FakeUsersRepository';
import RefreshTokenService from '@domains/users/services/RefreshTokenService';
import AuthenticateUserService from '@domains/users/services/AuthenticateUserService';
import FakeBCryptHashProvider from '@domains/users/providers/HashProvider/fakes/FakeBCryptHashProvider';
import AppError from '@shared/errors/AppError';

let hashProvider: FakeBCryptHashProvider;
let usersRepository: FakeUsersRepository;
let refreshTokenService: RefreshTokenService;
let authenticateUserService: AuthenticateUserService;

describe('Refresh User Token', () => {
  beforeEach(() => {
    hashProvider = new FakeBCryptHashProvider();
    usersRepository = new FakeUsersRepository();
    refreshTokenService = new RefreshTokenService(usersRepository);
    authenticateUserService = new AuthenticateUserService(
      usersRepository,
      hashProvider,
    );
  });

  it("should refresh user token if it's valid", async () => {
    const user = await usersRepository.create({
      name: 'Jackie Chan',
      email: 'jackiechan@test.com',
      password: 'meaningless password',
    });

    const { token, refreshToken } = await authenticateUserService.execute(user);

    expect(token).toBeTruthy();
    expect(refreshToken).toBeTruthy();

    const {
      token: newToken,
      refreshToken: newRefreshToken,
    } = await refreshTokenService.execute(refreshToken);

    expect(newToken).toBeTruthy();
    expect(newRefreshToken).toBeTruthy();
  });

  it('should not refresh invalid tokens', async () => {
    const invalidRefreshToken = "that's an invalid token";

    await expect(
      refreshTokenService.execute(invalidRefreshToken),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should invalidate user refresh token after changing passwords', async () => {
    const user = await usersRepository.create({
      name: 'Jackie Chan',
      email: 'jackiechan@test.com',
      password: 'meaningless password',
    });

    const { refreshToken } = await authenticateUserService.execute(user);

    user.password = 'Updated password';

    await usersRepository.save(user);

    await expect(
      refreshTokenService.execute(refreshToken),
    ).rejects.toBeInstanceOf(AppError);
  });
});
