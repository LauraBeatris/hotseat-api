import User from '../infra/database/entities/User';
import RecoverPasswordRequest from '../infra/database/entities/RecoverPasswordRequest';

export default interface IRecoverPasswordRequest {
  create(user_id: User['id']): Promise<RecoverPasswordRequest>;
}
