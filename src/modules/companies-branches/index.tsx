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

  async getUsers(id: number | string): Promise<UserInterface[]>;
  async getUsers(id: number | string, pagination: PaginationArgument): Promise<FormatedResponse<UserInterface>>;
  async getUsers(id: number | string, pagination: PaginationArgument = DEFAULT_PAGINATION_ARGUMENT): Promise<UserInterface[] | FormatedResponse<UserInterface>> {
    const url = `${this.baseUrl}/${id}/users`;
    return this.gettable<UserInterface>(url, pagination);
  }
}