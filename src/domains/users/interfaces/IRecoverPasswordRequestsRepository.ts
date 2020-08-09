import User from '@domains/users/infra/database/entities/User';
import RecoverPasswordRequest from '@domains/users/infra/database/entities/RecoverPasswordRequest';

export default interface IRecoverPasswordRequestsRepository {
  create(user_id: User['id']): Promise<RecoverPasswordRequest>;

  findByToken(
    token: RecoverPasswordRequest['token'],
  ): Promise<RecoverPasswordRequest | undefined>;

  delete(id: RecoverPasswordRequest['id']): Promise<void>;
}
