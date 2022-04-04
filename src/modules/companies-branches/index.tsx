import HttpClient from "core/http-client";
import Module from "modules/module";
import { CompaniesBranchesInterface, CreateCompaniesBranchesInterface } from "types/companies-branches.interface";
import { FormatedResponse } from "types/formated-response.interface";
import { DEFAULT_PAGINATION_ARGUMENT, PaginationArgument } from "types/pagination-argument";
import { UserInterface } from "types/user.interface";

export default class CompaniesBranches extends Module<CompaniesBranchesInterface, CreateCompaniesBranchesInterface> {
  constructor(http: HttpClient) {
    super(http, '/companies-branches');
  }

  /**
   * @description get all the users that belongs to the given company branch
   * @param {number | string} id get the company branch users by id 
   * @returns {UserInterface[]}
   */
  async getUsers(id: number | string): Promise<UserInterface[]>;
  /**
   * @description get all the users that belongs to the given company branch
   * @param {number | string} id get the company branch users by id 
   * @param {PaginationArgument} pagination arguments filter the user data
   * @returns {UserInterface[]}
   */
  async getUsers(id: number | string, pagination: PaginationArgument): Promise<FormatedResponse<UserInterface>>;
  async getUsers(id: number | string, pagination: PaginationArgument = DEFAULT_PAGINATION_ARGUMENT): Promise<UserInterface[] | FormatedResponse<UserInterface>> {
    const url = `${this.baseUrl}/${id}/users`;
    return this.gettable<UserInterface>(url, pagination);
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