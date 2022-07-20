import { UserProfile } from './user-profile';
/**
 * response после логина
 */
export interface LoginResponse {
  accessToken: string;
  userProfile: UserProfile;
}
