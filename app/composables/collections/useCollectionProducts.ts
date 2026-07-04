import type { Product } from '~~/types/Products';
import type { ShopifyConnection } from '~~/types/Shopify';

interface CollectionProductsPayload {
  collection: {
    products: ShopifyConnection<Product>;
  };
}
export function useCollectionProducts(handle: string) {
  const collectionProductsUrl = computed(
    (): string => `/collections/${handle}/products`,
  );

  const { data, loading, graphqlErrors, fetchError, refresh, execute } =
    useFetchSingle<ShopifyConnection<Product>, CollectionProductsPayload>(
      collectionProductsUrl,
      (payload: CollectionProductsPayload): ShopifyConnection<Product> => {
        return (
          payload.collection.products ?? {
            nodes: [],
            pageInfo: { hasNextPage: false, hasPreviousPage: false },
          }
        );
      },
    );

  return {
    data,
    loading,
    graphqlErrors,
    fetchError,
    refresh,
    execute,
  };
}
