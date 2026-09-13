import { createCartLine } from '@/tests/factories/cart.line.factory.ts';
import { $fetch } from 'ofetch';
import { defineStore } from 'pinia';
import type { Cart, CartLine, OptimisticCartLine } from '~~/types/Cart';
import type { MoneyV2 } from '~~/types/Shopify';

export const useCartStore = defineStore('cart', () => {
  // @todo: move constants in separate file
  const CART_STORAGE_KEY = 'shopify_cart_id';

  // state
  const cartId = ref<string | null>(null);
  const cart = ref<Cart | null>(null);
  // @todo: make loading plugin
  const isLoading = ref(false);

  const pendingLineIds = ref<Set<string>>(new Set());

  // getters
  const itemCount = computed((): number => cart.value?.totalQuantity ?? 0);
  const checkOutUrl = computed((): string | null => cart.value?.checkoutUrl ?? null);

  const items = computed((): OptimisticCartLine[] =>
    (cart.value?.lines.nodes ?? []).map((line: CartLine) => ({
      ...line,
      optimistic: pendingLineIds.value.has(line.id),
    })),
  );

  const subTotal = computed(
    (): MoneyV2 | null => cart.value?.cost.subtotalAmount ?? null,
  );

  const hasAnyPendingLine = computed(() => pendingLineIds.value.size > 0);

  function buildOptimisticCartLine(
    tempId: string,
    merchandiseId: string,
    quantity: number,
    currencyCode: string = 'PHP',
  ): CartLine {
    return createCartLine(
      {
        id: tempId,
        quantity,
        cost: {
          totalAmount: { currencyCode },
        },
        merchandise: {
          id: merchandiseId,
          price: { currencyCode },
        },
      },
      true,
    );
  }

  // helpers

  // persist cartId
  function persistCartId(id: string | null): void {
    cartId.value = id;
    if (import.meta.client) {
      if (id) {
        localStorage.setItem(CART_STORAGE_KEY, id);
      } else {
        localStorage.removeItem(CART_STORAGE_KEY);
      }
    }
  }
  // resolve BFF URL conflict
  function splitCartRouteParams(): { cartShortId: string; cartKeyParams: string } {
    if (!cartId.value) {
      return {
        cartShortId: '',
        cartKeyParams: '',
      };
    }

    const cleanGId = cartId.value.split('/').pop() || '';
    const splitByKeyValue = cleanGId.split('?') || '';

    return {
      cartShortId: splitByKeyValue[0] || '', // shortId
      cartKeyParams: splitByKeyValue[1] || '', // ?key
    };
  }

  // actions
  async function init(): Promise<void> {
    if (!import.meta.client) return; // localStorage: browser only

    const savedId = localStorage.getItem(CART_STORAGE_KEY);
    if (savedId) {
      cartId.value = savedId;

      await fetchCart(); // if expired fetch
    }
  }

  async function fetchCart(): Promise<void> {
    if (!cartId.value) return;

    try {
      const { cartShortId, cartKeyParams } = splitCartRouteParams();
      cart.value = await $fetch<Cart>(`/api/cart/${cartShortId}?${cartKeyParams}`);
    } catch {
      // reset -> fresh cart
      persistCartId(null);
      cart.value = null;
    }
  }

  async function addItem(merchandiseId: string, quantity = 1): Promise<void> {
    if (!cartId.value) {
      isLoading.value = true;
      try {
        // if first add:item
        cart.value = await $fetch<Cart>(`/api/cart`, {
          method: 'POST',
          body: {
            lines: [
              {
                merchandiseId,
                quantity,
              },
            ],
          },
        });
        // persist/save for future sessions
        persistCartId(cart.value.id);
      } finally {
        isLoading.value = false;
      }
      return;
    }

    // unique, non-shopify GID
    const tempCartId = `oprimistic-${Date.now()}-${Math.random()}`;

    // save
    const previousCart = structuredClone(toRaw(cart.value));

    try {
      if (cart.value) {
        // add placeholder to local arr
        const optimisticCartLine = buildOptimisticCartLine(
          tempCartId,
          merchandiseId,
          quantity,
        );

        cart.value.lines.nodes.push(optimisticCartLine);

        // update item count as well
        cart.value.totalQuantity += quantity;

        // mark temp Id as pending for loader
        pendingLineIds.value.add(tempCartId);

        try {
          const { cartShortId, cartKeyParams } = splitCartRouteParams();
          // sync with server

          // replace optimistic state with real server state, actual cartLine.id, correct price etc.
          cart.value = await $fetch<Cart>(
            `api/cart/${cartShortId}/lines?${cartKeyParams}`,
            {
              method: 'POST',
              body: {
                cartId: cartId.value,
                lines: [
                  {
                    merchandiseId,
                    quantity,
                  },
                ],
              },
            },
          );
        } catch (error) {
          cart.value = previousCart;
          throw error;
        } finally {
          pendingLineIds.value.delete(tempCartId);
        }
      }
    } finally {
      isLoading.value = false;
    }

    // else {
    //   const { cartShortId, cartKeyParams } = splitCartRouteParams();
    //   cart.value = await $fetch<Cart>(
    //     `/api/cart/${cartShortId}/lines?${cartKeyParams}`,
    //     {
    //       method: 'POST',
    //       body: {
    //         cartId: cartId.value,
    //         lines: [
    //           {
    //             merchandiseId,
    //             quantity,
    //           },
    //         ],
    //       },
    //     },
    //   );
    // }
  }

  async function updateItem(lineId: string, quantity: number): Promise<void> {
    if (!cartId.value) return;
    isLoading.value = true;

    // if request quantity to 0, removeItem
    if (quantity <= 0) {
      await removeItem(lineId);
      return;
    }

    try {
      const { cartShortId, cartKeyParams } = splitCartRouteParams();
      cart.value = await $fetch<Cart>(
        `/api/cart/${cartShortId}/lines?${cartKeyParams}`,
        {
          method: 'PUT',
          body: {
            cartId: cartId.value,
            lines: [
              {
                id: lineId,
                quantity,
              },
            ],
          },
        },
      );
    } finally {
      isLoading.value = false;
    }
  }

  async function removeItem(lineId: string): Promise<void> {
    if (!cartId.value) return;
    isLoading.value = true;

    try {
      const { cartShortId, cartKeyParams } = splitCartRouteParams();
      cart.value = await $fetch<Cart>(
        `/api/cart/${cartShortId}/lines?${cartKeyParams}`,
        {
          method: 'DELETE',
          body: {
            cartId: cartId.value,
            lineIds: [lineId],
          },
        },
      );
    } finally {
      isLoading.value = false;
    }
  }

  return {
    // state
    cartId,
    cart,
    isLoading,

    // getters
    itemCount,
    items,
    subTotal,
    checkOutUrl,
    hasAnyPendingLine,

    // actions
    init,
    fetchCart,
    addItem,
    updateItem,
    removeItem,
  };
});
