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
  const { items, loading, pageInfo, graphqlErrors, fetchError, refresh, execute } =
    useFetchList<Collection, CollectionPayload>(
      '/collections',
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
