import type { Product } from '~~/types/Products';

interface ProductPayload {
  product: Product | null;
}
export function useProduct(handle: string | MaybeRefOrGetter<string>) {
  const { data, loading, fetchError, graphqlErrors, refresh, execute } =
    useFetchSingle(
      `/products/${handle}`,
      (payload: ProductPayload): Product | null => payload.product,
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
