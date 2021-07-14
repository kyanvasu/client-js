import Config from '../env';
import KanvasSDK from '../src/index';

const client = new KanvasSDK(Config);
const email = 'demo@dealerappcenter.com';
const password = 'nosenose';
const unregisterdEmail = 'no-one@dealerappcenter.com';
const wrongPassword = 'password';

describe('Perform Auth module Test', () => {
  describe('Can user be authenticated', () => {
    test('User can login', async() => {
      const data = await client.auth.login(email, password);
      
      expect(data.token).toBeDefined();
    });
  });

  describe('User failed authentication', () => {
    test('User does not provide an email.', async() => {
      const { errors: { data } } = await client.auth.login('', password).catch(error => error);

      expect(data[0].email[0]).toEqual('The email field is required.');
    });

    test('User does not provide a password', async() => {
      const { errors: { data } } = await client.auth.login(email, '').catch(error => error);

      expect(data[0].password[0]).toEqual('The password field is required.');
    });

    test('User does not provide a password', async() => {
      const { errors: { data } } = await client.auth.login('', '').catch(error => error);

      expect(data[0].email[0]).toEqual('The email field is required.');
      expect(data[0].password[0]).toEqual('The password field is required.');
    });

    test('User does not provide valid credentials', async() => {
      const { errors: { message } } = await client.auth.login(unregisterdEmail, password).catch(error => error);

      expect(message).toEqual('No User Found');
    });

    test('User provides wrong password', async() => {
      const { errors: { message } } = await client.auth.login(email, wrongPassword).catch(error => error);

      expect(message).toEqual('Invalid email or password.');
    });
  });
});
