import { AuthMocks } from '@/tests/e2e/helpers/mocks/auth.mocks';
import { createCustomer } from '@/tests/factories/customer.factory';
import { Customer } from '@/types/Customer';

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

Cypress.Commands.add(
  'loginAsUser',
  (customerOverrides: Record<string, string> = {}): Cypress.Chainable<Customer> => {
    const customer = createCustomer(customerOverrides);

    cy.session(
      ['shopify-customer-session', customer.id],
      () => {
        cy.setCookie(
          'shopify_access_token',
          `shcat_mock_${customer.id}_${Date.now()}`,
          {
            path: '/',
            secure: true,
            httpOnly: true,
            sameSite: 'lax',
          },
        );
        cy.setCookie('shopify_refresh_token', `shcrt_mock_refresh_${customer.id}`, {
          path: '/',
          secure: true,
          hostOnly: true,
          sameSite: 'lax',
        });
      },
      {
        validate() {
          cy.getCookie('shopify_access_token').should('exist');
        },
      },
    );

    AuthMocks.mockAuthenticatedUser(customer);

    return cy.wrap(customer);
  },
);
