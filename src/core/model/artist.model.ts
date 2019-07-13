import { ImageSource } from '@src/assets/images';
import { Gender } from './profile.model';

export enum ArtistType {
  YOUTUBERS = 'Youtubers',
  ARTISTS = 'Artists',
  MUSICIANS = 'Youtuber',
  ACTORS = 'Actors',
  COMEDIANS = 'Comedians',
}

export interface Artist {
  id: string;
  photo: ImageSource;
  about: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  type: ArtistType;
  age: number;
  weight: number;
  height: number;
  inseam: number;
  email: string;
  phoneNumber: string;
  location: string;
  onLine?: boolean;
  price: number;
  responseTime: number;
}
