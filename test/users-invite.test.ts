/* eslint-disable @typescript-eslint/camelcase */
import Config from '../env';
import KanvasSDK from '../src/index';
import { UserInviteInterface } from '../src/types/user-invite.interface'

const client = new KanvasSDK(Config);

const inviteEmail = `demo-client-js-${Date.now()}@mctekk.com`;

const email = 'demo@dealerappcenter.com';
const password = 'nosenose';

let createdInvite: UserInviteInterface;


describe('Performs Users Invite module Test', () => {
  beforeEach(async () => {
    await client.auth.login(email, password);
  })

  describe('Testing POST user invites', () => {
    test('Create new user invite', async () => {
      const invite = await client.users.invite({
        email: inviteEmail,
        role_id: 1
      });

      createdInvite = invite

      expect(invite.id).toBeDefined();
    })

  })

  describe('Testing GET user invites', () => {
    test('Get user invites list', async () => {
      const invites = await client.userInvite.get();
      expect(invites.length).toBeGreaterThanOrEqual(0);
    })

    test('Get user invite by id', async () => {
      const invite = await client.userInvite.getById(createdInvite.id);
      expect(invite.id).toBe(createdInvite.id);
    })
  })

  describe('Testing DELETE user invites', () => {
    test('Remove user invites from list', async () => {
      const deleteInvite = await client.userInvite.remove(createdInvite.id);
      expect(deleteInvite).toBeDefined()
    })
  })
})
