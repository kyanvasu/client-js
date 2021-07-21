/* eslint-disable @typescript-eslint/camelcase */
import Config from '../env';
import KanvasSDK from '../src/index';
import { UserInterface, CreateUserParams, CreatedUser } from '../src/types/user.interface';

const client = new KanvasSDK(Config);

const email = `demo-client-js-${Date.now()}@mctekk.com`;
const password = 'N0s3N0s3';
const confirmPassword = 'N0s3N0s3'
let createdUser: UserInterface;

describe('Performs Users module Test', () => {
  describe('Testing user creation', () => {
    test('User cant be created with blank email', async() => {
      const { errors: { data } } = await client.users.create<CreatedUser, CreateUserParams>({
        email:'',
        password,
        verify_password: confirmPassword
      }).catch(error => error);
      const [error] = data;
      expect(error.email[0]).toEqual('The email field is required.');
    });
    test('User cant be created with blank passwords', async() => {
      const { errors: { data } } = await client.users.create<CreatedUser, CreateUserParams>({
        email,
        password: '',
        verify_password: ''
      }).catch(error => error);
      const [error] = data;
      expect(error.password[0]).toEqual('The password field is required.');
    });
    test('User cant be created with mismatching password', async() => {
      const { errors: { message } } = await client.users.create<CreatedUser, CreateUserParams>({
        email,
        password,
        verify_password: 'missing'
      }).catch(error => error);
      expect(message).toEqual('New password and confirmation do not match.');
    });
    test(`Create an user using email and password`, async () => {
      const newUser = await client.users.create<CreatedUser, CreateUserParams>({
        email,
        password,
        verify_password: confirmPassword
      })
      createdUser = newUser.user;
      
      expect(createdUser.id).toBeDefined();
    });
  })

  describe('Can new created user be authenticated', () => {
    test('Authenticate new user using client SDK', async () => {
      const data = await client.auth.login(email, password);
      expect(data.token).toBeDefined();
    })
  })

  describe('Testing User update', () => {
    test('User can be updated', async() => {
      const lastname = 'SDK CLIENT';
      const displayname = 'kvsClientSDK';
      expect(createdUser.lastname).toEqual('User');
      const updatedUser = await client.users.update<UserInterface>(createdUser.id, { ...createdUser, lastname, displayname })
      expect(updatedUser.lastname).toEqual(lastname);
      expect(updatedUser.displayname).toEqual(displayname);
      createdUser = updatedUser;
    })
  })

  describe('Testing Get users', () => {
    test('Test get user by id', async () => {
      const user = await client.users.getById(createdUser.id);
      expect(Number(user.id)).toEqual(Number(createdUser.id));
      expect(user.displayname).toEqual(createdUser.displayname);
      expect(user.email).toEqual(createdUser.email);
    })

    test('Get users list', async () => {
      const users = await client.users.get();
      expect(users).toBeInstanceOf(Array);
      const [first] = users;
      expect(first.id).toBeDefined();
    })

    test('Get users with pagination arguments', async () => {
      const response = await client.users.get({ limit: 10, format: true, page: 1, }) 
      const { data } = response;
    
      expect(response.page).toBe(1);
      expect(data.length).toBeGreaterThanOrEqual(0);
    })
  })

  // describe('Testing Delete user', () => {
  //   test(`Deleting user ${email}`, async () => {
  //     const deleted = await client.users.delete(createdUser.id);
  //     expect(Number(deleted.id)).toBe(createdUser.id);
  //   })
  // })


 
})
