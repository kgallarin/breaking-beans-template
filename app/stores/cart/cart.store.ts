import { $fetch } from 'ofetch';
import { defineStore } from 'pinia';
import type { Cart, CartLine } from '~~/types/Cart';
import type { MoneyV2 } from '~~/types/Shopify';

export const useCartStore = defineStore('cart', () => {
  // @todo: move constants in separate file
  const CART_STORAGE_KEY = 'shopify_cart_id';

  // state
  const cartId = ref<string | null>(null);
  const cart = ref<Cart | null>(null);
  // @todo: make loading plugin
  const isLoading = ref(false);

  // getters
  const itemCount = computed((): number => cart.value?.totalQuantity ?? 0);
  const items = computed((): CartLine[] | [] => cart.value?.lines.nodes ?? []);
  const subTotal = computed(
    (): MoneyV2 | null => cart.value?.cost.subtotalAmount ?? null,
  );
  const checkOutUrl = computed((): string | null => cart.value?.checkoutUrl ?? null);

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
    isLoading.value = true;

    try {
      // if first add:item
      if (!cartId.value) {
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
      } else {
        const { cartShortId, cartKeyParams } = splitCartRouteParams();
        cart.value = await $fetch<Cart>(
          `/api/cart/${cartShortId}/lines?${cartKeyParams}`,
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
      }
    } finally {
      isLoading.value = false;
    }
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

    // actions
    init,
    fetchCart,
    addItem,
    updateItem,
    removeItem,
  };
});
