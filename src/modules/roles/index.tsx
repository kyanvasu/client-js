import HttpClient from 'core/http-client';
import Module from 'modules/module';
import { RoleInterface } from 'types/role.interface';

export default class Roles extends Module<RoleInterface> {
  constructor(http: HttpClient) {
    super(http, '/roles');
  }
}