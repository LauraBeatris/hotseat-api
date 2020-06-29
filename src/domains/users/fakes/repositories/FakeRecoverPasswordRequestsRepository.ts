import { addHours } from 'date-fns';
import { uuid } from 'uuidv4';
import RecoverPasswordRequest from '@domains/users/infra/database/entities/RecoverPasswordRequest';
import IRecoverPasswordRequestsRepository from '@domains/users/interfaces/IRecoverPasswordRequestsRepository';

class FakeRecoverPasswordRequestsRepository
  implements IRecoverPasswordRequestsRepository {
  private requests: RecoverPasswordRequest[] = [];

  public async create(user_id: string): Promise<RecoverPasswordRequest> {
    const recoverPasswordRequest = Object.assign(new RecoverPasswordRequest(), {
      user_id,
      token: uuid(),
      expires_at: addHours(new Date(), 2),
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.requests.push(recoverPasswordRequest);

    return recoverPasswordRequest;
  }

  public async findByToken(
    token: RecoverPasswordRequest['token'],
  ): Promise<RecoverPasswordRequest | undefined> {
    const recoverPasswordRequest = this.requests.find(
      findRecoverPasswordRequest => findRecoverPasswordRequest.token === token,
    );

    return recoverPasswordRequest;
  }
}

export default FakeRecoverPasswordRequestsRepository;
