import type { CollectionProductsPayload } from '~~/types/Collection';
import type { Product } from '~~/types/Products';
import type { ShopifyConnection } from '~~/types/Shopify';

export function useCollectionProducts(
  handle: string | MaybeRefOrGetter<string>,
  first = 2,
) {
  const collectionProductsUrl = computed(
    (): string => `/collections/${toValue(handle)}/products`,
  );

  const after = ref<string | null>(null);
  const extraPages = ref<(Product | null | undefined)[]>([]);

  const { items, loading, graphqlErrors, fetchError, refresh, execute, pageInfo } =
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
      {
        query: computed(() => ({
          first,
          after: after.value ?? undefined,
        })),
      },
    );

  const collectionProducts = computed((): (Product | null | undefined)[] =>
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

  watch(
    (): string => toValue(handle),
    (): void => reset(),
  );

  return {
    collectionProducts,
    pageInfo,
    items,
    loading,
    loadMore,
    graphqlErrors,
    fetchError,
    refresh,
    execute,
    reset,
  };
}
