/* eslint-disable @typescript-eslint/camelcase */
import Config from '../env';
import KanvasSDK, { UserInterface } from '../src/index';

const client = new KanvasSDK(Config);


const email = 'demo@dealerappcenter.com';
const confirmationEmail = `demo-client-js-${Date.now()}@mctekk.com`;
const firstname = 'Demo';
const lastname = 'Test';
const password = 'nosenose';

let createdUser: UserInterface;

describe('Performs Users Invite module Test', () => {
  beforeEach(async () => {
    await client.auth.login(email, password);
  })

  test('Should create a new user confirmation', async () => {
    const user = await client.usersConfirmation.create({
      firstname,
      lastname,
      email: confirmationEmail,
      description: `${confirmationEmail}'s Test`,
      role_id: 2
    });

    createdUser = user;

    expect(user.firstname).toBe(firstname);
    expect(user.email).toBe(confirmationEmail);
  });

  test('Should get the current user confirmation', async () => {
    const user = await client.usersConfirmation.validate(createdUser.user_activation_key);
    expect(user.email).toBe(createdUser.email);
  });

  test('Should confirm the current user confirmation', async () => {
    const user = await client.usersConfirmation.confirm(createdUser.user_activation_key, password);
    expect(user.email).toBe(createdUser.email);
  });
})
