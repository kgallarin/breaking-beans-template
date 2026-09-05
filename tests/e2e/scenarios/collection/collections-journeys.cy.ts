import { collectionMocks } from '@/tests/e2e/helpers/mocks/collection.mocks';
import { collectionPage } from '@/tests/e2e/page-objects/collection.page';

describe('Collections User Journeys - E2E Test Suite', () => {
  it('Mounts correct length of collection cards', () => {
    collectionMocks.mockListCollections(4);

    collectionPage.visit();
    collectionPage.waitFor('collectionListMock');

    collectionPage.collectionCard.should('have.length', 4);
  });
});
