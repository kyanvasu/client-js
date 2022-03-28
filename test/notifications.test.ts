import Config from '../env';
import KanvasSDK from '../src/index';
const client = new KanvasSDK(Config);

const email = 'demo@dealerappcenter.com';
const password = 'nosenose';

// let notifications: NotificationInterface[];

describe('Perform Notifications module Test', () => {
  beforeAll(async () => {
    await client.auth.login(email, password)
  });
  
  test('should get all notifications', async () => {
    const data = await client.notifications.get();

    expect(data.length).toBeGreaterThanOrEqual(1);
  });

  test('should get all filtered notifications base on the params', async () => {
    const { data } = await client.notifications.get({
      format: true,
      q: '(is_deleted:0)',
      sort: 'created_at|DESC'
    });

    // notifications = data;
    expect(data.length).toBeGreaterThanOrEqual(1);
  });

  // bastacio - backend is failing soo commented until is fixed 
  // test('should clear the latest notifications', async () => {
  //   const ids = notifications.map((notification) => notification.id);
  //   await client.notifications.clearAll(ids);
  //   expect(true).toBeTruthy();
  // });
});
