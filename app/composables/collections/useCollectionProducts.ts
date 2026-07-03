import type { Product } from '~~/types/Products';
import type { ShopifyConnection } from '~~/types/Shopify';

interface CollectionProductsPayload {
  collection: {
    products: ShopifyConnection<Product>;
  };
}
export function useCollectionProducts(handle: string) {
  const { data, loading, graphqlErrors, fetchError, refresh, execute } =
    useFetchSingle<ShopifyConnection<Product>, CollectionProductsPayload>(
      `/collections/${handle}/products`,
      (payload: CollectionProductsPayload): ShopifyConnection<Product> => {
        return payload.collection.products;
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
