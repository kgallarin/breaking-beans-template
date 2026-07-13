import type { ShopifyPageInfo } from '~~/types/Shopify';

interface CursorPagination<T> {
  getItems: () => T[];
  getPageInfo: () => ShopifyPageInfo | null | undefined;
  getLoading: () => boolean;
  onRefresh: () => void;
}
export function useCursorPagination<T>({
  getItems,
  getPageInfo,
  getLoading,
  onRefresh,
}: CursorPagination<T>) {
  const after = ref<string | null>(null);
  const initialPages = shallowRef<T[]>([]);

  const appendedPageItems = computed((): T[] => {
    const currentItems = getItems() ?? [];

    if (getLoading() && after.value) {
      return [...initialPages.value];
    }

    return [...initialPages.value, ...currentItems];
  });

  function loadMore(): void {
    const pageInfo = getPageInfo();
    if (!pageInfo?.hasNextPage || getLoading()) return;

    const currentItems = getItems() ?? [];
    initialPages.value = [...initialPages.value, ...currentItems];
    after.value = pageInfo.endCursor ?? null;
  }

  function reset() {
    after.value = null;
    initialPages.value = [];
    onRefresh();
  }

  return {
    after,
    initialPages,
    appendedPageItems,
    loadMore,
    reset,
  };
}
