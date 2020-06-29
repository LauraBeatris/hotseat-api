import User from '../infra/database/entities/User';
import RecoverPasswordRequest from '../infra/database/entities/RecoverPasswordRequest';

export default interface IRecoverPasswordRequestsRepository {
  create(user_id: User['id']): Promise<RecoverPasswordRequest>;
  findByToken(
    token: RecoverPasswordRequest['token'],
  ): Promise<RecoverPasswordRequest | undefined>;
}
