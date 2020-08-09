import IRecoverPasswordRequestsRepository from '@domains/users/interfaces/IRecoverPasswordRequestsRepository';
import { getRepository } from 'typeorm';
import { addHours } from 'date-fns';

import { RESET_PASSWORD_REQUEST_EXPIRES_IN_HOURS } from '@domains/users/constants/resetPassword';
import RecoverPasswordRequest from '@domains/users/infra/database/entities/RecoverPasswordRequest';

class RecoverPasswordRequestsRepository
  implements IRecoverPasswordRequestsRepository {
  private ormRepository = getRepository(RecoverPasswordRequest);

  public async create(user_id: string): Promise<RecoverPasswordRequest> {
    const recoverPasswordRequest = await this.ormRepository.create({
      user_id,
      expires_at: addHours(Date.now(), RESET_PASSWORD_REQUEST_EXPIRES_IN_HOURS),
    });

    await this.ormRepository.save(recoverPasswordRequest);

    return recoverPasswordRequest;
  }

  public async findByToken(
    token: RecoverPasswordRequest['token'],
  ): Promise<RecoverPasswordRequest | undefined> {
    const recoverPasswordRequest = await this.ormRepository.findOne({
      where: { token },
    });

    return recoverPasswordRequest;
  }

  public async delete(id: RecoverPasswordRequest['id']): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default RecoverPasswordRequestsRepository;
