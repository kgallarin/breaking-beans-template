import { AbstractMockHelper } from '@/tests/e2e/helpers/mocks/base.mocks';
import { Customer } from '@/types/Customer';
import { CyHttpMessages } from 'cypress/types/net-stubbing';

export class AuthMocks extends AbstractMockHelper {
  public mockAuthenticatedUser(customer: Customer): Customer {
    this.mockGet('/api/auth/me', customer, 200, 'getAuthMe');

    void this.mockPost(
      '/graphql',
      (request: CyHttpMessages.IncomingHttpRequest) => {
        if (request.body.operationName === 'GetCurrentCustomer') {
          request.reply({
            data: customer,
          });
        }
      },
      200,
      'gqlGetCustomer',
    );

    return customer;
  }

  public mockUnauthenticatedCustomer() {
    this.mockGet(
      '/api/auth/me',
      {
        data: {
          error: 'Unauthorized',
          message: 'No active session',
        },
      },
      401,
      'getAuthUnauthorized',
    );
  }
}

export const authMocks = new AuthMocks();
