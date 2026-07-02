import { useApiFetchList } from '~/composables/api/useApiFetchList';
import type { ShopifyConnection } from '~~/types/ApiResponse';

interface Product {
  id: string;
  title: string;
}

// payload from shopify
interface ProductsPayload {
  products: ShopifyConnection<Product>;
}
export function useProducts() {
  const { items, pageInfo, graphqlErrors, fetchError, loading, refresh, execute } = useApiFetchList<
    Product,
    ProductsPayload
  >('/products', (payload: ProductsPayload): ShopifyConnection<Product> => payload.products);

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
