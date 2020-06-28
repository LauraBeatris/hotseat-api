import { addHours } from 'date-fns';
import RecoverPasswordRequest from '@domains/users/infra/database/entities/RecoverPasswordRequest';

class FakeRecoverPasswordRequestRepository {
  private requests: RecoverPasswordRequest[] = [];

  public async create(user_id: string): Promise<RecoverPasswordRequest> {
    const recoverPasswordRequest = Object.assign(new RecoverPasswordRequest(), {
      user_id,
      expires_at: addHours(new Date(), 2),
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.requests.push(recoverPasswordRequest);

    return recoverPasswordRequest;
  }
}

export default FakeRecoverPasswordRequestRepository;
