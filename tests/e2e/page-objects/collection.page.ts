import { AbstractPageObject } from '@/tests/e2e/page-objects/page.base';

export class CollectionPage extends AbstractPageObject {
  protected pageUrl = '/collections';

  get collectionCard(): Cypress.Chainable {
    return cy.getBySel('collection-card');
  }
}

export const collectionPage = new CollectionPage();
