/* eslint-disable @typescript-eslint/camelcase */
import Config from '../env';
import KanvasSDK from '../src/index';
import { SubscriptionsInterface } from '../src/types/subscriptions.interface';
const client = new KanvasSDK(Config);

const email = 'demo@dealerappcenter.com';
const password = 'nosenose';
const paymentMethod = {
    'card_number' : '4242424242424242',
    'card_exp_month': 12,
    'card_exp_year' : 2024,
    'card_cvc' : 333
};
const plans = ['monthly-10-1', 'yearly-10-1'];
let subscription: SubscriptionsInterface;

describe('Perform Subscription module Test', () => {
  beforeAll(async () => {
    await client.auth.login(email, password);
  });

  describe('Testing fetching subscriptions', () => {
    test('Test get subscriptions plain list', async () => {
      const subscriptionsList = await client.subscriptions.get();
      expect(subscriptionsList).toBeInstanceOf(Array);
      const [ sub ] = subscriptionsList;
      subscription = sub;
      expect(sub.id).toBeDefined();
    });
    test('Test get subscriptions paginated list', async () => {
      const paginatedSubscriptions = await client.subscriptions.get({ format: true });
      const { data: subscriptionsList } = paginatedSubscriptions;
      expect(paginatedSubscriptions.page).toBe(1);
      expect(subscriptionsList.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Testing update payment method', () => {
    test('Test update payment method', async () => {
      const sub = await client.subscriptions.updatePaymentMethod(Number(subscription.id), paymentMethod);
      expect(sub.id).toBe(subscription.id);
    });
  });

  describe('Testing change plan method', () => {
    test('Test change plan method', async () => {
      const newPlan = plans.filter((plan) => plan !== subscription.name)[0];
      const sub = await client.subscriptions.changePlan(Number(subscription.id), newPlan);
      expect(sub.id).toBe(subscription.id);
      expect(sub.name).toBe(newPlan);
    });
  });

  describe('Testing cancel subscription', () => {
    test('Test cancel subscription', async () => {
      const sub = await client.subscriptions.cancel(Number(subscription.id));
      expect(sub.id).toBe(subscription.id);
      expect(sub.is_cancelled).toBe(1);
    });
  });

  describe('Testing reactiate subscription', () => {
    test('Test reactiate subscription', async () => {
      const sub = await client.subscriptions.reactivate(Number(subscription.id));
      expect(sub.id).toBe(subscription.id);
      expect(sub.is_cancelled).toBe(0);
    });
  });
});
