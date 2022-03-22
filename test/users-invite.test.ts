/* eslint-disable @typescript-eslint/camelcase */
import Config from '../env';
import KanvasSDK from '../src/index';
import { UserInviteInterface } from '../src/types/user-invite.interface'

const client = new KanvasSDK(Config);

const inviteEmail = `demo-client-js-${Date.now()}@mctekk.com`;

const email = 'demo@dealerappcenter.com';
const firstname = 'Demo';
const lastname = 'Test';
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

    test('Resend invitation to a user', async () => {
      const message = await client.userInvite.resend(createdInvite.id);

      expect(message).toBe('Success');
    });
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

  describe('Testing process user invites', () => {
    test('convert invite user into user', async () => {
      try {
        const invite = await client.users.invite({
          email: inviteEmail,
          role_id: 1
        });
        
        const { user } = await client.userInvite.process(invite.invite_hash, {
          email: inviteEmail,
          verify_password: password,
          password,
          firstname,
          lastname,
        });
  
        expect(user.email).toBe(inviteEmail);
        expect(user.firstname).toBe(firstname);
        expect(user.lastname).toBe(lastname);
      } catch (e) {
        console.log();
        expect(true).toBeFalsy();
      }
    });
  })
})
