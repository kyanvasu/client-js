import { UserInterface } from './user.interface';

export enum DevicePlatform {
  IOS = 'iosapp',
  ANDROID = 'androidapp',
}

export default interface DeviceRegisterResponse {
  msg: string;
  user: UserInterface;
}