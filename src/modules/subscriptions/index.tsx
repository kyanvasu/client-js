import HttpClient from "core/http-client";
import Base from "modules/base";
import { SubscriptionsInterface, PaymentMethodInterface, UpdatePaymentMethodInterface, PaymentHistoryInterface } from "types/subscriptions.interface";
import { FormatedResponse } from "types/formated-response.interface";
import { DEFAULT_PAGINATION_ARGUMENT, PaginationArgument } from "types/pagination-argument";

export default class Subscription extends Base {
  constructor(http: HttpClient) {
    super(http, 'subscriptions');
  }

  /**
   * @description Get all the app plans in the platform.
   * @returns {SubscriptionsInterface[]}
   */
  async get(): Promise<SubscriptionsInterface[]>
  /**
   * @description Get all the app plans in the platform.
   * @param {PaginationArgument} params pagination arguments
   * @returns {FormatedResponse<SubscriptionsInterface>}
   */
  async get(params: PaginationArgument): Promise<FormatedResponse<SubscriptionsInterface>>;
  async get(params: PaginationArgument = DEFAULT_PAGINATION_ARGUMENT): Promise<SubscriptionsInterface[] | FormatedResponse<SubscriptionsInterface>> {
    if (params.format) {
      const { data } = await this.http.request<FormatedResponse<SubscriptionsInterface>>({
        url: this.baseUrl,
        method: 'GET',
        params
      });

      return data;
    }

    const { data } = await this.http.request<SubscriptionsInterface[]>({
      url: this.baseUrl,
      method: 'GET'
    });

    return data;
  }

  /**
   * @description Reactivate a subscription.
   * @param {number} subscriptionId
   * @returns {SubscriptionsInterface}
   */
  async reactivate(subscriptionId: number): Promise<SubscriptionsInterface> {
    const { data } = await this.http.request<SubscriptionsInterface>({
      method: 'POST',
      url: `${this.baseUrl}/${subscriptionId}/reactivate`
    });

    return data;
  }

  /**
   * @description Cancel a subscription.
   * @param {number} subscriptionId
   * @returns {SubscriptionsInterface}
   */
  async cancel(subscriptionId: number): Promise<SubscriptionsInterface> {
    const { data } = await this.http.request<SubscriptionsInterface>({
      method: 'DELETE',
      url: `${this.baseUrl}/${subscriptionId}`
    });

    return data;
  }

  /**
   * @description Get a subscriptions payment method data.
   * @param {number} subscriptionId 
   * @returns {PaymentMethodInterface}
   */
  async getPaymentMethod(subscriptionId: number): Promise<PaymentMethodInterface> {
    const { data } = await this.http.request<PaymentMethodInterface>({
      url: `${this.baseUrl}/${subscriptionId}/payment-method`,
    });

    return data;
  }

  /**
   * @description Update the subscription payment method.
   * @param {number} subscriptionId
   * @param {UpdatePaymentMethodInterface} params
   * @returns {SubscriptionsInterface}
   */
  async updatePaymentMethod(subscriptionId: number, params: UpdatePaymentMethodInterface): Promise<SubscriptionsInterface> {
    const { data } = await this.http.request<SubscriptionsInterface>({
      method: 'PUT',
      url: `${this.baseUrl}/${subscriptionId}/payment-method`,
      data: params,
    });

    return data;
  }

  /**
   * @description Change the subscription plan.
   * @param {number} subscriptionId
   * @param {string} planName
   * @returns {SubscriptionsInterface}
   */
  async changePlan(subscriptionId: number, planName: string): Promise<SubscriptionsInterface> {
    const { data } = await this.http.request<SubscriptionsInterface>({
      method: 'PUT',
      url: `${this.baseUrl}/${subscriptionId}`,
      data: {
        "stripe_id": planName
      },
    });

    return data;
  }

  /**
   * @description Get a subscription's payment history.
   * @param {number} subscriptionId 
   * @returns {PaymentHistoryInterface[]}
   */
  async paymentHistory(subscriptionId: number): Promise<PaymentHistoryInterface[]> {
    const { data } = await this.http.request<PaymentHistoryInterface[]>({
      url: `${this.baseUrl}/${subscriptionId}/payment-history`,
    });

    return data;
  }
}