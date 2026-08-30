import { productPage } from '@/tests/e2e/page-objects/product.page';

describe('E2E Suite- Product User Journeys', (): void => {
  beforeEach(() => {
    productPage.visit();
  });

  it('User clicks load more to see more products', (): void => {
    // cy.getBySel('load-more-products').click();
  });
});
