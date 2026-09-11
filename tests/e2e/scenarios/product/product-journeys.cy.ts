import { productMocks } from '@/tests/e2e/helpers/mocks/product.mocks';
import { productPage } from '@/tests/e2e/page-objects/product.page';

describe('Product User Journeys - E2E Test Suite', (): void => {
  it('Mounts correct length of products card', (): void => {
    productMocks.mockListProducts(3);

    productPage.visit();
    productPage.waitFor('productsListMock');

    productPage.productCard.should('have.length', 3);
  });
});
