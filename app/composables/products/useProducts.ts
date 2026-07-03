import { useFetchList } from '~/composables/api/useFetchList';
import type { Product } from '~~/types/Products';
import type { ShopifyConnection } from '~~/types/Shopify';

// payload from shopify
interface ProductsPayload {
  products: ShopifyConnection<Product>;
}
export function useProducts() {
  const { items, pageInfo, graphqlErrors, fetchError, loading, refresh, execute } =
    useFetchList<Product, ProductsPayload>(
      '/products',
      (payload: ProductsPayload): ShopifyConnection<Product> => payload.products,
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
