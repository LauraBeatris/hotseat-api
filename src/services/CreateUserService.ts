import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';

import AppError from '../errors/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const findUserWithSameEmail = await usersRepository.findOne({
      where: {
        email,
      },
    });

    if (findUserWithSameEmail) {
      throw new AppError('An user with that email already exists');
    }

    const passwordHash = await hash(password, 8);

    const user = await usersRepository.create({
      name,
      email,
      password: passwordHash,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
