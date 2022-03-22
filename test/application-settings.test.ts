import Config from '../env';
import KanvasSDK from '../src/index';
const client = new KanvasSDK(Config);

const email = 'demo@dealerappcenter.com';
const password = 'nosenose';

describe('check application works', () => {
  beforeAll(async () => {
    await client.auth.login(email, password)
  });
  
  test('get apps', async () => {
    const data = await client.application.getApps();

    expect(data.length).toBeGreaterThanOrEqual(1);
  })
  
  test('get settings', async () => {
    const data = await client.application.getSettings();
    
    expect(data.name).toBeDefined();
  });
});
