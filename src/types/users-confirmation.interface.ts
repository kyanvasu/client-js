import { CompaniesBranchesInterface } from "./companies-branches.interface";
import { CompanyInterface } from "./companies.interface";

export interface UserValidate {
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  company: CompanyInterface;
  branch: CompaniesBranchesInterface;
  invitation_from: {
    id: number | string;
    firstname: string;
    lastname: string;
  };
}

export interface CreateUserConfirmation {
  firstname: string;
  lastname: string;
  email: string;
  description: string;
  role_id: number;
}