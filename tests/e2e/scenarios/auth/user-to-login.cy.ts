import { accountPage } from '@/tests/e2e/page-objects/account.page';

describe('E2e - User Journey from Homepage to Login', () => {
  it('User clicks to login button in the header nav, and proceeds to login page', () => {
    cy.loginAsUser({ name: 'Kevin Gallarin' }).then(() => {
      accountPage.visit();

      cy.wait('@getAuthMe');
    });
  });
});
