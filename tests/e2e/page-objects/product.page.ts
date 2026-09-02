import { AbstractPageObject } from '@/tests/e2e/page-objects/page.base';

export class ProductPage extends AbstractPageObject {
  protected pageUrl = '/products';

  get productCard(): Cypress.Chainable {
    return cy.getBySel('product-card');
  }
}

export const productPage = new ProductPage();
