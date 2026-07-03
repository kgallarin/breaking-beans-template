import { useFetch } from '#app';
import type { UseFetchOptions } from 'nuxt/app';
import type { ShopifyApiError, ShopifyApiResponse } from '~~/types/ApiResponse';

export function useFetchSingle<TNode, TPayload>(
  url: string | MaybeRefOrGetter<string>,
  extract: (payload: TPayload) => TNode | undefined | null,
  options?: UseFetchOptions<ShopifyApiResponse<TPayload>>,
) {
  const { $api } = useRuntimeConfig();

  const { data, status, error, refresh, execute } = useFetch<ShopifyApiResponse<TPayload>>(url, {
    $fetch: $api as UseFetchOptions<ShopifyApiResponse<TPayload>>['$fetch'],
    ...options,
    dedupe: 'defer',
  });

  const extractedData = computed((): TNode | null => {
    if (!data.value?.data) return null;
    return extract(data.value.data) ?? null;
  });

  return {
    data: extractedData,
    // explicitly exposing graphql errors from Shopify
    graphqlErrors: computed((): ShopifyApiError[] => data.value?.errors ?? []),
    // nuxt http/network errors
    fetchError: error,
    loading: computed((): boolean => status.value === 'pending'),
    refresh,
    execute,
  };
}
