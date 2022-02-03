/* eslint-disable @typescript-eslint/camelcase */
import Config from '../env';
import KanvasSDK, { RoleInterface } from '../src/index';

const client = new KanvasSDK(Config);
const email = 'demo@dealerappcenter.com';
const password = 'nosenose';
let storedRole: RoleInterface;

describe('Perform Roles module Test', () => {  
  beforeAll(async () => {
    await client.auth.login(email, password).catch(error => error);
  })

  describe('Testing fetching roles', () => {
    test('Test get roles paginated list', async () => {
      const paginatedRoles = await client.roles.get({ format: true });
      const { data: rolesList } = paginatedRoles;
      storedRole = rolesList[0];

      expect(paginatedRoles.page).toBe(1);
      expect(rolesList.length).toBeGreaterThanOrEqual(0);
    });
    test('Test get company by id', async () => {
      const role = await client.roles.getById(storedRole.id);
      expect(Number(role.id)).toEqual(Number(storedRole.id));
      expect(role.name).toEqual(storedRole.name);
    });
    test('Test get roles plain list', async () => {
      const roleList = await client.roles.get();
      expect(roleList).toBeInstanceOf(Array);
      const [ role ] = roleList;
      expect(role.id).toBeDefined();
    });
    test('Test get roles paginated list with a query', async () => {
      const paginatedRoles = await client.roles.get({ format: true, q: "(is_deleted: 1)" });
      const { data: roleList } = paginatedRoles;
      expect(paginatedRoles.page).toBe(1);
      
      if (roleList.length > 0) {
        expect(roleList[0].is_deleted).toBe(1);
      } else {
        expect(roleList.length).toBe(0);
      }
    });
  });
});