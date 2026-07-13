import type { Collection, CollectionPayload } from '~~/types/Collection';

export function useCollection(handle: string | MaybeRefOrGetter<string>) {
  const url = computed((): string => `/collections/${handle}`);

  const { data, loading, fetchError, graphqlErrors, refresh, status, execute } =
    useFetchSingle(
      url,
      (payload: CollectionPayload): Collection | null => payload.collection,
    );

  return {
    data,
    loading,
    fetchError,
    graphqlErrors,
    refresh,
    status,
    execute,
  };
}
