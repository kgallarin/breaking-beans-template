import { AbstractMockHelper } from '@/tests/e2e/helpers/mocks/base.mocks';
import { createCollections } from '@/tests/factories/collection.factory';
import { Collection } from '@/types/Collection';
import { API_ENDPOINTS } from '@support/constants/endpoints';

class CollectionMocks extends AbstractMockHelper {
  public mockListCollections(
    quantity: number = 2,
    collectionOverrides: Partial<Collection> = {},
    routeParams: Record<string, string> | URLSearchParams = {},
  ): void {
    const collections = createCollections(quantity, collectionOverrides);
    const query = this.arrangeUrlQuery(routeParams);

    const urlPattern = query
      ? `${API_ENDPOINTS.COLLECTIONS.LIST}?${query}*`
      : `${API_ENDPOINTS.COLLECTIONS.LIST}*`;

    const collectionResponse = {
      data: {
        collections: {
          edges: collections.map((collection) => ({ node: collection })),
        },
      },
    };

    return this.mockGet(urlPattern, collectionResponse, 200, 'collectionListMock');
  }
}

export const collectionMocks = new CollectionMocks();
