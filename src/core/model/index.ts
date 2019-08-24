export { Profile, ProfileSocials, ProfileActivity } from './profile.model';

export interface ArtistRate {
  rate: 0 | 1 | 2 | 3 | 4 | 5;
  message: string;
  customerName: string;
}
