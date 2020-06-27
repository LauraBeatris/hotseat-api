import FakeUsersRepository from '@domains/users/fakes/repositories/FakeUsersRepository';
import CreateUserService from '@domains/users/services/CreateUserService';
import FakeBCryptHashProvider from '@domains/users/providers/HashProvider/fakes/FakeBCryptHashProvider';
import FakeDiskStorageProvider from '@shared/providers/StorageProvider/fakes/FakeDiskStorageProvider';
import AppError from '@shared/errors/AppError';
import UploadAvatarService from '../UploadAvatarService';

describe('Upload User Avatar', () => {
  it('should upload user avatar', async () => {
    const usersRepository = new FakeUsersRepository();

    const hashProvider = new FakeBCryptHashProvider();
    const storageProvider = new FakeDiskStorageProvider();

    const createUserService = new CreateUserService(
      usersRepository,
      hashProvider,
    );
    const uploadAvatarService = new UploadAvatarService(
      usersRepository,
      storageProvider,
    );

    const avatarFilename = 'jackie-chan-kicking.jpg';

    const user = await createUserService.execute({
      name: 'Jackie Chan',
      email: 'jackiechan@test.com',
      password: 'meanless password',
    });

    await uploadAvatarService.execute({
      user_id: user.id,
      avatarFilename,
    });

    expect(user.avatar).toBe(avatarFilename);
  });

  it('should delete old avatar when user uploads a new one', async () => {
    const usersRepository = new FakeUsersRepository();

    const hashProvider = new FakeBCryptHashProvider();
    const storageProvider = new FakeDiskStorageProvider();

    const createUserService = new CreateUserService(
      usersRepository,
      hashProvider,
    );
    const uploadAvatarService = new UploadAvatarService(
      usersRepository,
      storageProvider,
    );

    const oldFilename = 'jackie-chan-kicking.jpg';
    const newFilename = 'jackie-chan-pushing.jpg';

    const user = await createUserService.execute({
      name: 'Jackie Chan',
      email: 'jackiechan@test.com',
      password: 'meanless password',
    });

    const deleteFile = jest.spyOn(storageProvider, 'deleteFile');

    await uploadAvatarService.execute({
      user_id: user.id,
      avatarFilename: oldFilename,
    });

    await uploadAvatarService.execute({
      user_id: user.id,
      avatarFilename: newFilename,
    });

    expect(deleteFile).toHaveBeenCalledWith(oldFilename);
    expect(user.avatar).toBe(newFilename);
  });

  it('should not upload avatar for unexisting user', async () => {
    const usersRepository = new FakeUsersRepository();

    const storageProvider = new FakeDiskStorageProvider();

    const uploadAvatarService = new UploadAvatarService(
      usersRepository,
      storageProvider,
    );

    expect(
      uploadAvatarService.execute({
        user_id: 'unexisting user id',
        avatarFilename: 'meanless-filename.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
