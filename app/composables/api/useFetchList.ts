import { type UseFetchOptions, useFetch } from '#app';
import type {
  ShopifyApiError,
  ShopifyApiResponse,
  ShopifyConnection,
  ShopifyEdge,
  ShopifyPageInfo,
} from '~~/types/Shopify';

export function useFetchList<TNode, TPayload>(
  url: string | MaybeRefOrGetter<string>,
  // function to tell composable where Connection type lives in the payload
  extract: (payload: TPayload) => ShopifyConnection<TNode | undefined | null>,
  options?: UseFetchOptions<ShopifyApiResponse<TPayload>>,
) {
  const { $api } = useNuxtApp();

  const { data, status, error, refresh, execute } = useFetch<
    ShopifyApiResponse<TPayload>
  >(url, {
    $fetch: $api as UseFetchOptions<ShopifyApiResponse<TPayload>>['$fetch'],
    ...options,
    dedupe: 'defer',
  });

  // isolate the connection object using extract()
  const connection = computed(() => {
    if (!data.value?.data) return null;
    return extract(data.value.data);
  });

  const flattenedNodeOrEdges = computed((): (TNode | undefined | null)[] => {
    const extractedConnection = connection.value;

    if (!extractedConnection) return [];
    if (extractedConnection.nodes) return extractedConnection.nodes;
    if (extractedConnection.edges)
      return extractedConnection.edges.map(
        (edge: ShopifyEdge<TNode | undefined | null>): TNode | undefined | null =>
          edge.node,
      );

    return [];
  });

  return {
    items: flattenedNodeOrEdges,
    // meta on php
    pageInfo: computed(
      (): ShopifyPageInfo | null => connection.value?.pageInfo ?? null,
    ),
    graphqlErrors: computed((): ShopifyApiError[] => data.value?.errors ?? []),
    fetchError: error,
    loading: computed((): boolean => status.value === 'pending'),
    refresh,
    execute,
  };
}
