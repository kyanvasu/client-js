/* eslint-disable @typescript-eslint/camelcase */
import Config from '../env';
import KanvasSDK from '../src/index';
const client = new KanvasSDK(Config);

const email = 'demo@dealerappcenter.com';
const password = 'nosenose';

// let subscriptions: SubscriptionInterface[];
// let company: CompanyInterface;

describe('Perform Subscription  module Test', () => {
  beforeAll(async () => {
    await client.auth.login(email, password);
    // company = await client.companies.getById(104, { relationships: 'subscription' });
  });
  
  test('should get all subscriptions', async () => {
    const data = await client.subscription.get();
    // subscriptions = data;
    expect(data.length).toBeGreaterThanOrEqual(1);
  });

  test('should get all filtered subscriptions', async () => {
    const { data } = await client.subscription.get({
      format: true,
      q: '(is_deleted:0)',
      sort: 'created_at|DESC'
    });

    expect(data.length).toBeGreaterThanOrEqual(1);
  });

  // bastacio: current test are commented because backend service is failling 
  // test('should update the current subscription', async () => {
  //   const plans = subscriptions.filter((plan) => plan.stripe_plan !== company?.subscription?.stripe_plan)
  //   const { stripe_plan, stripe_id, payment_style }: SubscriptionInterface = plans[0];
  //   await client.subscription.update(stripe_plan, {
  //     stripe_id,
  //     payment_style,
  //     stripe_plan
  //   });
  //   expect(true).toBeTruthy();
  // });

  // test('should remove the current subscription', async () => {
  //   await client.subscription.delete(company?.subscription?.stripe_plan)
  //   expect(true).toBeTruthy();
  // });
});
