import { addHours } from 'date-fns';
import { uuid } from 'uuidv4';
import RecoverPasswordRequest from '@domains/users/infra/typeorm/entities/RecoverPasswordRequest';
import IRecoverPasswordRequestsRepository from '@domains/users/interfaces/IRecoverPasswordRequestsRepository';
import { RESET_PASSWORD_REQUEST_EXPIRES_IN_HOURS } from '@domains/users/constants/resetPassword';

class FakeRecoverPasswordRequestsRepository
  implements IRecoverPasswordRequestsRepository {
  private requests: RecoverPasswordRequest[] = [];

  public async create(user_id: string): Promise<RecoverPasswordRequest> {
    const recoverPasswordRequest = Object.assign(new RecoverPasswordRequest(), {
      user_id,
      token: uuid(),
      expires_at: addHours(Date.now(), RESET_PASSWORD_REQUEST_EXPIRES_IN_HOURS),
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

  public async delete(id: RecoverPasswordRequest['id']): Promise<void> {
    const requestIndex = this.requests.findIndex(request => request.id === id);

    if (requestIndex > -1) {
      this.requests.splice(requestIndex, 1);
    }
  }
}

export default FakeRecoverPasswordRequestsRepository;
