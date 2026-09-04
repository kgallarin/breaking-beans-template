import { authMocks } from '@/tests/e2e/helpers/mocks/auth.mocks';
import { accountPage } from '@/tests/e2e/page-objects/account.page';

describe('E2e - User Journey from Homepage to Login', () => {
  context('Authenticated Journeys', () => {
    it('User can visit /account page and see profile details', () => {
      cy.loginAsUser().then((): void => {
        // arrange
        cy.visit('/').then(() => {
          accountPage.waitFor('getAuthMe');

          accountPage.visit();
          accountPage.accountWrapper.should('exist');
        });
      });
    });

    it("Should show the correct details of user's name and email  on /account page on visit", (): void => {
      cy.loginAsUser({
        firstName: 'John',
        lastName: 'Doe',
        emailAddress: {
          emailAddress: 'john@email.com',
        },
      }).then(() => {
        cy.visit('/').then(() => {
          accountPage.waitFor('getAuthMe');

          accountPage.visit();
          accountPage.accountWrapper
            .should('contain', 'John')
            .and('contain', 'john@email.com');
        });
      });
    });
  });

  context.only('Unauthenticated Journeys', () => {
    beforeEach(() => {
      cy.clearCookies();
      cy.clearLocalStorage();
      authMocks.mockUnauthenticatedCustomer();
    });
    it('Redirects the user into login page when unauthenticated', () => {
      cy.visit('/account');

      cy.url().should('include', '/login');
    });
  });
});
