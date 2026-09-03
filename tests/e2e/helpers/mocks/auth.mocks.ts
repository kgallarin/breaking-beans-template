import { Customer } from '@/types/Customer';

export class AuthMocks {
  static mockAuthenticatedUser(customer: Customer): Customer {
    cy.intercept('GET', '/api/auth/me', {
      statusCode: 200,
      body: customer,
    }).as('getAuthMe');

    cy.intercept('POST', '/graphql', (request) => {
      if (request.body.operationName === 'GetCurrentCustomer') {
        request.reply({
          data: customer,
        });
      }
    }).as('gqlGetCurrentCustomer');

    return customer;
  }

  static mockUnauthenticatedCustomer() {
    cy.intercept('GET', '/api/auth/me', {
      statusCode: 200,
      body: {
        error: 'Unauthorized',
        message: 'No active session',
      },
    }).as('getAuthUnauthorized');
  }
}
