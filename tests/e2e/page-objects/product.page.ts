import { AbstractPageObject } from '@/tests/e2e/page-objects/page.base';

import Chainable = Cypress.Chainable;

export class ProductPage extends AbstractPageObject {
  protected pageUrl = '/products';

  get productCard(): Chainable {
    return cy.getBySel('product-card');
  }
}

export const productPage = new ProductPage();
