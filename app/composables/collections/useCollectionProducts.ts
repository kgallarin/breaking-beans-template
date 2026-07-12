import type { Product } from '~~/types/Products';
import type { ShopifyConnection } from '~~/types/Shopify';

interface CollectionProductsPayload {
  collection: {
    products: ShopifyConnection<Product>;
  };
}
export function useCollectionProducts(handle: string | MaybeRefOrGetter<string>) {
  const collectionProductsUrl = computed(
    (): string => `/collections/${toValue(handle)}/products`,
  );

  const { items, loading, graphqlErrors, fetchError, refresh, execute } =
    useFetchList<Product, CollectionProductsPayload>(
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
    items,
    loading,
    graphqlErrors,
    fetchError,
    refresh,
    execute,
  };
}
