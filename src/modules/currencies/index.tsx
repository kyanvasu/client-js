import HttpClient from "core/http-client";
import { CurrencyInterface } from "types/currencies.interface";
import { Module } from "..";

export default class Currencies extends Module<CurrencyInterface, Partial<CurrencyInterface>> {
  constructor(http: HttpClient) {
    super(http, '/currencies');
  }
}