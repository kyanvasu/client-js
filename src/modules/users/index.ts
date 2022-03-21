/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/camelcase */
/**
 * Kanvas SDK Users Module
 * Samuel J. Mancebo
 * 2021-07-06
 */
import Module from 'modules/module';
import HttpClient from 'core/http-client';
import { UserInterface, CreateUserParams, CreatedUser } from 'types/user.interface';
import DeviceRegisterResponse, { DevicePlatform } from 'types/device-register';
import { CreateUserInvite, UserInviteInterface } from 'types/user-invite.interface';

/**
 * @description Kanvas Users Module
 */
export default class Users extends Module<UserInterface, CreateUserParams> {
  constructor(http: HttpClient) {
    super(http, '/users');
  }

  /**
   * @description Create a user.
   * @param {<T>} userData - Data to be posted for creating the user.
   * @returns {Promise<T>} - Newly created user.
   */
  async create(userData: UserInterface | CreateUserParams): Promise<UserInterface> {
    const { data } = await this.http.request<CreatedUser>({
      method: 'POST',
      url: this.baseUrl,
      data: userData
    });

    return data.user;
  }

  /**
   * @description Register user device for push notifications
   * @param {number} userId
   * @param {string} deviceId - OneSignal Device ID 
   * @param {DevicePlatform} devicePlatform - Device OS
   * @returns {Promise<DeviceRegisterResponse>} - Device/User association
   */
   async registerDevice(userId: number, deviceId: string, devicePlatform: DevicePlatform): Promise<DeviceRegisterResponse> {
    const formData = new FormData();
    formData.append('app', devicePlatform);
    formData.append('deviceId', deviceId);
    
    const { data } = await this.http.request<DeviceRegisterResponse>({
      method: 'POST',
      url: `${this.baseUrl}/${userId}/devices`,
      data: formData,
    });
    return data;
  }

  /**
   * @description Unregister user push notifications device
   * @param {number} userId
   * @param {string} deviceId - OneSignal Device ID 
   * @returns {Promise<DeviceRegisterResponse>} - Device/User association
   */
  async unregisterDevice(userId: number, deviceId: string): Promise<DeviceRegisterResponse> {
    const { data } = await this.http.request<DeviceRegisterResponse>({
      method: 'DELETE',
      url: `${this.baseUrl}/${userId}/devices/${deviceId}`,
    });
    return data;
  }

  /**
   * @description Invites a new user.
   * @param {<CreateUserInvite>} userData - Data to be posted for creating the user invitation.
   * @returns {Promise<UserInviteInterface>} - Newly created user invitation.
   */
  async invite(userData: CreateUserInvite): Promise<UserInviteInterface> {
    const { data } = await this.http.request<UserInviteInterface>({
      method: 'POST',
      url: `${this.baseUrl}/invite`,
      data: userData
    });

    return data;
  }

  async requestDeleteAccount(id: number): Promise<UserInterface> {
    const { data } = await this.http.request<UserInterface>({
      method: 'POST',
      url: `${this.baseUrl}/${id}/request-delete-account`
    });

    return data;
  }

  async removeRequestDeleteAccount(id: number): Promise<UserInterface> {
    const { data } = await this.http.request<UserInterface>({
      method: 'DELETE',
      url: `${this.baseUrl}/${id}/request-delete-account`
    });

    return data;
  }
}