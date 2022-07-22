import { UserProfile } from 'src/app/models/user-profile';

/**
 * response после логина
 */
export interface LoginResponse {
  accessToken: string;
  userProfile: UserProfile;
}
