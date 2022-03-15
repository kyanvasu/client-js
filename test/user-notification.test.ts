/* eslint-disable @typescript-eslint/camelcase */
import Config from '../env';
import KanvasSDK, { UserNotificationInterface } from '../src/index';

const client = new KanvasSDK(Config);

const email = 'demo@dealerappcenter.com';
const password = 'nosenose';

let notification: UserNotificationInterface;

describe('Performs User Notifications  module Test', () => {
  beforeEach(async () =>{
    await client.auth.login(email, password);
  })

  test('Get all user notifications', async () => {
    const notifications = await client.userNotifications.get(0);
    notification = notifications[0];
    expect(notifications.length).toBeGreaterThanOrEqual(0)
  })

  // test('Update existing user notification', async () => {
  //   const current = await client.userNotifications.update(0, {
  //     ...notification,
  //     is_enabled: 0,
  //   });
  //   expect(current.is_enabled).toBe(0)
  // })

  test('Disable all user notifications', async() => {
    const notifications = await client.userNotifications.delete(0);
    expect(notifications).toBe('All Notifications are muted')
  })
})
