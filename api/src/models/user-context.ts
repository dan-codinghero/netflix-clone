import { ACCOUNT_FLOW } from '../entities/account';
import ProfileModel from './profile-model';

interface UserContext {
    workflow: ACCOUNT_FLOW | null;
    isInFreeTrial?: boolean | null;
    profiles?: Array<ProfileModel> | null;
}

export default UserContext;
