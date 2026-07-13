import type { Collection, CollectionsPayload } from '~~/types/Collection';
import type { ShopifyConnection } from '~~/types/Shopify';

export function useCollections() {
  const collectionsUrl = computed((): string => '/collections');
  const { items, loading, pageInfo, graphqlErrors, fetchError, refresh, execute } =
    useFetchList<Collection, CollectionsPayload>(
      collectionsUrl,
      (payload: CollectionsPayload): ShopifyConnection<Collection> =>
        payload.collections,
    );

  return {
    items,
    loading,
    pageInfo,
    graphqlErrors,
    fetchError,
    refresh,
    execute,
  };
}
