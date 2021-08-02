/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/camelcase */
/**
 * Kanvas SDK Companies Module
 */
import Module from 'modules/module';
import HttpClient from 'core/http-client';
import { CompaniesInterface } from 'types/companies.interface';

/**
 * @description Kanvas Companies Module
 */
export default class Companies extends Module<CompaniesInterface> {
  constructor(http: HttpClient) {
    super(http, '/companies');
  }
}