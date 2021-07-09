import KanvasSDK from '../src/index';

console.log(process.env.APP_KEY);

const client = new KanvasSDK({
  appKey: '7d0488b2-632e-4045-9d2d-370d9161644a',
  baseUrl: 'https://crmdev.api.dealerappcenter.com/v2'
});

describe('check application works', () => {
  test('get settings', async () => {
    const data = await client.application.getSettings();
    
    expect(data.name).toBeDefined();
  });
});
