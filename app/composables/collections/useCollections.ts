import type { ShopifyConnection } from '~~/types/Shopify';

interface Collection {
  id: string;
  title: string;
  description: string;
  handle: string;
  updatedAt: string;
}

interface CollectionPayload {
  collections: ShopifyConnection<Collection>;
}

export function useCollections() {
  const collectionsUrl = computed((): string => '/collections');
  const { items, loading, pageInfo, graphqlErrors, fetchError, refresh, execute } =
    useFetchList<Collection, CollectionPayload>(
      collectionsUrl,
      (payload: CollectionPayload): ShopifyConnection<Collection> =>
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
