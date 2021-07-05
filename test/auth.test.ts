import KanvasSDK from '../src/index';

const client = new KanvasSDK({
  appKey: '7d0488b2-632e-4045-9d2d-370d9161644a',
  baseUrl: 'https://crmdev.api.dealerappcenter.com/v2'
});

describe('check auth works', () => {
  test('can log in', async() => {
    const data = await client.auth.login('demo@dealerappcenter.com', 'nosenose');
    
    expect(data.token).toBeDefined();
  });

  test('log in fails email', async() => {
    const { errors: { data } } = await client.auth.login('', 'nosenose').catch(error => error);

    expect(data[0].email[0]).toEqual('The email field is required.');
  });

  test('log in fails password', async() => {
    const { errors: { data } } = await client.auth.login('demo@dealerappcenter.com', '').catch(error => error);

    expect(data[0].password[0]).toEqual('The password field is required.');
  });

  test('user not found', async() => {
    const { errors: { message } } = await client.auth.login('no-one@email.com', 'nosenose').catch(error => error);

    expect(message).toEqual('No User Found');
  });

  test('invalid email or password', async() => {
    const { errors: { message } } = await client.auth.login('demo@dealerappcenter.com', 'password').catch(error => error);

    expect(message).toEqual('Invalid email or password.');
  });
});
