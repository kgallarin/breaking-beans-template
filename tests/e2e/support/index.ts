type GetOptions = Partial<
  Cypress.Timeoutable & Cypress.Loggable & Cypress.Withinable & Cypress.Shadow
>;

declare namespace Cypress {
  interface Chainable {
    // custom command for selecting dom attr
    getBySel(dataCyValue: string, options?: GetOptions): Chainable;

    // intercept storefront graphql by operation name
    mockShopifyGraphQL(operationName: string, fixturePath: string): Chainable;
  }
}
