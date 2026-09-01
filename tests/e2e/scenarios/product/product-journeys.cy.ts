import { productMocks } from '@/tests/e2e/helpers/mocks/product.mocks';
import { productPage } from '@/tests/e2e/page-objects/product.page';

describe('E2E Suite- Product User Journeys', (): void => {
  it('User clicks load more to see more products', (): void => {
    productMocks.mockListProducts(10);

    productPage.visit();
    // productPage.waitFor('productsListMock');

    productPage.productCard.should('have.length', 2);
  });
});
