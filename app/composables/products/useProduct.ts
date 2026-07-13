import type { Product, ProductPayload } from '~~/types/Products';

export function useProduct(handle: string | MaybeRefOrGetter<string>) {
  const url = computed((): string => `/products/${handle}`);
  const { data, loading, fetchError, graphqlErrors, refresh, status, execute } =
    useFetchSingle(
      url,
      (payload: ProductPayload): Product | null => payload.product,
    );

  return {
    data,
    loading,
    status,
    graphqlErrors,
    fetchError,
    refresh,
    execute,
  };
}
