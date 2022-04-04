/* eslint-disable @typescript-eslint/camelcase */
/**
 * Kanvas SDK Companies Module
 */
import Module from 'modules/module';
import HttpClient from 'core/http-client';
import { CompanyInterface, CreateCompanyParams } from 'types/companies.interface';

/**
 * @description Kanvas Companies Module
 */
export default class Companies extends Module<CompanyInterface, CreateCompanyParams> {
  constructor(http: HttpClient) {
    super(http, '/companies');
  }

  /**
   * @description remove the given user by it id from the company branch
   * @param {number | string} id company branch id 
   * @param {number | string} userId user id to be removed
   * @returns {Promise<string>}
   */
   async removeUser(id: number | string, userId: number | string): Promise<string> {
    const { data } = await this.http.request<string>({
      url: `${this.baseUrl}/${id}/users/${userId}`,
      method: 'DELETE',
    })

    return data;
  }
}