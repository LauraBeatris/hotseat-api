import FakeUsersRepository from '@domains/users/fakes/repositories/FakeUsersRepository';
import UploadAvatarService from '@domains/users/services/UploadAvatarService';
import FakeDiskStorageProvider from '@shared/providers/StorageProvider/fakes/FakeDiskStorageProvider';
import AppError from '@shared/errors/AppError';

let usersRepository: FakeUsersRepository;

let storageProvider: FakeDiskStorageProvider;

let uploadAvatarService: UploadAvatarService;

describe('Upload User Avatar', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();

    storageProvider = new FakeDiskStorageProvider();

    uploadAvatarService = new UploadAvatarService(
      usersRepository,
      storageProvider,
    );
  });

  it('should upload user avatar', async () => {
    const avatarFilename = 'jackie-chan-kicking.jpg';

    const user = await usersRepository.create({
      name: 'Jackie Chan',
      email: 'jackiechan@test.com',
      password: 'meaningless password',
    });

    await uploadAvatarService.execute({
      user_id: user.id,
      avatarFilename,
    });

    expect(user.avatar).toBe(avatarFilename);
  });

  it('should delete old avatar when user uploads a new one', async () => {
    const oldFilename = 'jackie-chan-kicking.jpg';
    const newFilename = 'jackie-chan-pushing.jpg';

    const user = await usersRepository.create({
      name: 'Jackie Chan',
      email: 'jackiechan@test.com',
      password: 'meaningless password',
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
    await expect(
      uploadAvatarService.execute({
        user_id: 'unexisting user id',
        avatarFilename: 'meaningless-filename.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
