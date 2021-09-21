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
}