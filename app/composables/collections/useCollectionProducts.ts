import type { CollectionProductsPayload } from '~~/types/Collection';
import type { Product } from '~~/types/Products';
import type { ShopifyConnection, ShopifyPageInfo } from '~~/types/Shopify';

export function useCollectionProducts(
  handle: string | MaybeRefOrGetter<string>,
  first = 2,
) {
  const collectionProductsUrl = computed(
    (): string => `/collections/${toValue(handle)}/products`,
  );

  const { appendedPageItems, after, loadMore, reset } = useCursorPagination({
    getItems: (): (Product | null | undefined)[] => items.value,
    getPageInfo: (): ShopifyPageInfo | null => pageInfo.value,
    getLoading: (): boolean => loading.value,
    onRefresh: (): Promise<void> => refresh(),
  });

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
        query: computed((): { first: number; after: string | undefined } => ({
          first,
          after: after.value ?? undefined,
        })),
      },
    );

  watch(
    (): string => toValue(handle),
    (): void => reset(),
  );

  return {
    collectionProducts: appendedPageItems,
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
