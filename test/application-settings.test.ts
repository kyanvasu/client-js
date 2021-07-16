import Config from '../env';
import KanvasSDK from '../src/index';
const client = new KanvasSDK(Config);

describe('check application works', () => {
  test('get settings', async () => {
    const data = await client.application.getSettings();
    
    expect(data.name).toBeDefined();
  });
});
