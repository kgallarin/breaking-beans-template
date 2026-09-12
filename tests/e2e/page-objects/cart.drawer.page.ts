import { AbstractPageObject } from '@/tests/e2e/page-objects/page.base';

export class CartDrawerPage extends AbstractPageObject {
  protected pageUrl = '';

  get cartLine(): Cypress.Chainable {
    return cy.getBySel('cart-line');
  }

  get cartView(): Cypress.Chainable {
    return cy.getBySel('cart-view');
  }
}
