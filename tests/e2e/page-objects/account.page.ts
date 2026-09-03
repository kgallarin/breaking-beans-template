import { AbstractPageObject } from '@/tests/e2e/page-objects/page.base';

export class AccountPage extends AbstractPageObject {
  protected pageUrl = '/account';

  get accountWrapper(): Cypress.Chainable {
    return cy.getBySel('account-wrapper');
  }
}

export const accountPage = new AccountPage();
