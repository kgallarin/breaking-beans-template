import type { Product, ProductsPayload } from '~~/types/Products';
import type { ShopifyConnection } from '~~/types/Shopify';

export function useProducts(first = 4) {
  const productsUrl = computed((): string => `/products`);
  const after = ref<string | null>(null);

  // holds the currently rendered items
  const extraPages = ref<(Product | null | undefined)[]>([]);

  const {
    items,
    pageInfo,
    graphqlErrors,
    fetchError,
    loading,
    refresh,
    execute,
    status,
  } = useFetchList<Product, ProductsPayload>(
    productsUrl,
    (payload: ProductsPayload): ShopifyConnection<Product> => payload.products,
    {
      query: computed(() => ({
        first,
        after: after.value ?? undefined,
      })),
    },
  );

  const products = computed((): (Product | null | undefined)[] =>
    loading.value && after.value
      ? extraPages.value
      : [...extraPages.value, ...items.value],
  );

  function loadMore(): void {
    if (!pageInfo.value?.hasNextPage || loading.value) return;
    extraPages.value = [...extraPages.value, ...items.value];
    after.value = pageInfo.value.endCursor ?? null;
  }

  function reset(): void {
    after.value = null;
    extraPages.value = [];
    refresh();
  }

  return {
    items,
    products,
    loadMore,
    loading,
    pageInfo,
    graphqlErrors,
    fetchError,
    status,
    refresh,
    execute,
    reset,
  };
}
