import { AbstractMockHelper } from '@/tests/e2e/helpers/mocks/base.mocks';
import { createProducts } from '@/tests/factories/product.factory';
import { Product } from '@/types/Products';
import { API_ENDPOINTS } from '@support/constants/endpoints';

class ProductMocks extends AbstractMockHelper {
  public mockListProducts(
    quantity: number = 4,
    productOverrides: Partial<Product> = {},
    routeParams: Record<string, string> | URLSearchParams = {},
  ): Cypress.Chainable {
    const products = createProducts(quantity, productOverrides);
    const query =
      routeParams instanceof URLSearchParams
        ? routeParams.toString()
        : new URLSearchParams(routeParams).toString();

    const urlPattern = query
      ? `${API_ENDPOINTS.PRODUCTS.LIST}?${query}*`
      : `${API_ENDPOINTS.PRODUCTS.LIST}*`;

    const productsResponse = {
      data: {
        products: {
          edges: products.map((product: Product) => ({ node: product })),
        },
      },
    };
    return this.mockGet(urlPattern, productsResponse, 200, 'productsListMock');
  }
}

export const productMocks = new ProductMocks();
