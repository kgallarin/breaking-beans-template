import { Customer } from '@/types/Customer';

type GetOptions = Partial<
  Cypress.Timeoutable & Cypress.Loggable & Cypress.Withinable & Cypress.Shadow
>;

declare global {
  namespace Cypress {
    // any: global library extension
     
    interface Chainable<Subject> {
      // custom command for selecting dom attr
      getBySel(dataCyValue: string, options?: GetOptions): Chainable;

      // intercept storefront graphql by operation name
      mockShopifyGraphQL(operationName: string, fixturePath: string): Chainable;

      // loginAs
      loginAsUser(customerOverrides?: Partial<Customer>): Chainable<Subject>;
    }
  }
}

export {};
