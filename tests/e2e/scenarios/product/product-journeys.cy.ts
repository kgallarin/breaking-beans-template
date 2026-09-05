import { productMocks } from '@/tests/e2e/helpers/mocks/product.mocks';
import { productPage } from '@/tests/e2e/page-objects/product.page';

describe('E2E Suite- Product User Journeys', (): void => {
  it('Mounts correct length of products card', (): void => {
    productMocks.mockListProducts(3); // arrange

    // act
    productPage.visit();
    productPage.waitFor('productsListMock');

    // assert
    productPage.productCard.should('have.length', 3);
  });
});
