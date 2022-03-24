import HttpClient from "core/http-client";
import Base from "modules/base";
import { PaymentMethodInterface } from "types/apps-plan.interface";

export class PaymentMethod extends Base {
  constructor(http: HttpClient) {
    super(http, 'apps-plans');
  }

  /**
   * @description get current payment method used inside the application
   * @param {string | number} id payment method's identifier
   * @returns 
   */
     async get(id: string | number): Promise<PaymentMethodInterface> {
      const { data } = await this.http.request<PaymentMethodInterface>({
        url: `${this.baseUrl}/${id}/method`,
        method: 'GET',
      });
  
      return data;
    }
    
    /**
     * @description updates current payment method by it's id
     * @param {string | number} id payment method's identifier
     * @param {PaymentMethodInterface} data payment data to be updated 
     * @returns 
     */
    async update(id: string | number, data: Partial<PaymentMethodInterface>): Promise<PaymentMethodInterface> {
      const result = await this.http.request<PaymentMethodInterface>({
        url: `${this.baseUrl}/${id}/method`,
        method: 'PUT',
        data
      });
  
      return result.data;
    }
}