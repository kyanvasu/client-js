/* eslint-disable @typescript-eslint/camelcase */
import Config from '../env';
import KanvasSDK from '../src/index';
import { CompanyInterface } from '../src/types/companies.interface';

const client = new KanvasSDK(Config);
const email = 'demo@dealerappcenter.com';
const password = 'nosenose';
const name = `Testing company - ${Date.now()}`;
let createdCompany: CompanyInterface;

describe('Perform Companies module Test', () => {  
  describe('Testing Company creation', () => {
    test('Company cannot be created with empty name', async () => {
      await client.auth.login(email, password);
      const { errors: { message } } = await client.companies.create({
        name: ''
      }).catch((error) => error);
      expect(message).toEqual('Companies Field name is required');
    });
    test('Create a company using name', async () => {
      const newCompany = await client.companies.create({
        name
      });
      createdCompany = newCompany;

      expect(createdCompany.id).toBeDefined();
    });
  });
  describe('Testing fetching companies', () => {
    test('Test get company by id', async () => {
      const company = await client.companies.getById(createdCompany.id);
      expect(Number(company.id)).toEqual(Number(createdCompany.id));
      expect(company.name).toEqual(createdCompany.name);
    });
    test('Test get companies plain list', async () => {
      const companiesList = await client.companies.get();
      expect(companiesList).toBeInstanceOf(Array);
      const [ company ] = companiesList;
      expect(company.id).toBeDefined();
    });
    test('Test get companies paginated list', async () => {
      const paginatedCompanies = await client.companies.get({ format: true });
      const { data: companiesList } = paginatedCompanies;
      expect(paginatedCompanies.page).toBe(1);
      expect(companiesList.length).toBeGreaterThanOrEqual(0);
    });
  });
});