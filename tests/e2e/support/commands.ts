import Chainable = Cypress.Chainable;
type Options = Partial<
  Cypress.Timeoutable & Cypress.Loggable & Cypress.Withinable & Cypress.Shadow
>;
Cypress.Commands.add('getBySel', (selector, options?: Options) => {
  return cy.get(`[data-testid=${selector}]`, options);
});

Cypress.Commands.add(
  'mockShopifyGraphQL',
  (operationName: string, fixturePath: string) => {
    cy.intercept('POST', '**/api/*/graphql.json', (req) => {
      if (req.body?.operationName === operationName) {
        req.reply({ fixture: fixturePath });
      }
    }).as(`gql${operationName}`);
  },
);
