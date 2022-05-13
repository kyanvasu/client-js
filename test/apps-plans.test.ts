/* eslint-disable @typescript-eslint/camelcase */
import Config from '../env';
import KanvasSDK from '../src/index';

const client = new KanvasSDK(Config);
const email = 'demo@dealerappcenter.com';
const password = 'nosenose';

describe('Perform Apps Plans module Test', () => {
  describe('Testing fetching apps plans', () => {
    test('Test get apps plans plain list', async () => {
      await client.auth.login(email, password);
      const appsPlansList = await client.appsPlans.get();
      expect(appsPlansList).toBeInstanceOf(Array);
      const [ appsPlan ] = appsPlansList;
      expect(appsPlan.id).toBeDefined();
    });
    test('Test get appls plans paginated list', async () => {
      const paginatedAppsPlans = await client.appsPlans.get({ format: true });
      const { data: appsPlansList } = paginatedAppsPlans;
      expect(paginatedAppsPlans.page).toBe(1);
      expect(appsPlansList.length).toBeGreaterThanOrEqual(0);
    });
  });
});