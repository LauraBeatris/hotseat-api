import FakeUsersRepository from '@domains/users/fakes/repositories/FakeUsersRepository';
import CreateUserService from '@domains/users/services/CreateUserService';
import SendRecoverPasswordRequestMailService from '@domains/users/services/SendRecoverPasswordMailService';
import FakeMailProvider from '@shared/providers/MailProvider/fakes/FakeMailProvider';
import FakeBCryptHashProvider from '@domains/users/providers/HashProvider/fakes/FakeBCryptHashProvider';
import AppError from '@shared/errors/AppError';
import FakeRecoverPasswordRequestRepository from '@domains/users/fakes/repositories/FakeRecoverPasswordRequestRepository';
import { addHours } from 'date-fns';

let hashProvider: FakeBCryptHashProvider;
let mailProvider: FakeMailProvider;

let usersRepository: FakeUsersRepository;
let recoverPasswordRequestRepository: FakeRecoverPasswordRequestRepository;

let createUserService: CreateUserService;
let sendRecoverPasswordMailService: SendRecoverPasswordRequestMailService;

describe('Recover Password Mail', () => {
  beforeEach(() => {
    hashProvider = new FakeBCryptHashProvider();
    mailProvider = new FakeMailProvider();
    recoverPasswordRequestRepository = new FakeRecoverPasswordRequestRepository();

    usersRepository = new FakeUsersRepository();
    createUserService = new CreateUserService(usersRepository, hashProvider);
    sendRecoverPasswordMailService = new SendRecoverPasswordRequestMailService(
      mailProvider,
      usersRepository,
      recoverPasswordRequestRepository,
    );
  });

  it('should be able to send mail for password recover requests', async () => {
    const userData = {
      name: 'Jackie Chan',
      email: 'jackiechanwrongemail@test.com',
      password: 'meanless password',
    };

    const { email } = await createUserService.execute(userData);

    const sendMail = jest.spyOn(mailProvider, 'sendMail');

    await sendRecoverPasswordMailService.execute({ email });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to send mails to unexisting users', async () => {
    await expect(
      sendRecoverPasswordMailService.execute({
        email: 'unexistinguser@test.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to generate a token based on the user id for the recover password request', async () => {
    const { id, email } = await createUserService.execute({
      name: 'Jackie Chan',
      email: 'jackiechan@test.com',
      password: 'meanless password',
    });

    const createToken = jest.spyOn(recoverPasswordRequestRepository, 'create');

    await sendRecoverPasswordMailService.execute({ email });

    expect(createToken).toHaveBeenCalledWith(id);
  });

  it('should be able to generate a expire date of two hours for the recover password request', async () => {
    const { id } = await createUserService.execute({
      name: 'Jackie Chan',
      email: 'jackiechan@test.com',
      password: 'meanless password',
    });

    const recoverPasswordRequest = await recoverPasswordRequestRepository.create(
      id,
    );

    expect(recoverPasswordRequest.expires_at).toEqual(addHours(new Date(), 2));
  });
});
