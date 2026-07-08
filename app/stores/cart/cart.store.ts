import { $fetch } from 'ofetch';
import { defineStore } from 'pinia';
import type { Cart } from '~~/types/Cart';
import type { MoneyV2 } from '~~/types/Shopify';

export const useCartStore = defineStore('cart', () => {
  // @todo: move constants in separate file
  const CART_ID = 'shopify_cart_id';

  // state
  const cartId = ref<string | null>(null);
  const cart = ref<Cart | null>(null);
  // @todo: make loading plugin
  const isLoading = ref(false);

  // getters
  const itemCount = computed(() => cart.value?.totalQuantity ?? 0);
  const items = computed(() => cart.value?.lines.nodes ?? []);
  const subTotal = computed(
    (): MoneyV2 | null => cart.value?.cost.subtotalAmount ?? null,
  );
  const checkOutUrl = computed(() => cart.value?.checkoutUrl ?? null);

  // persist cartId helper
  function persistCartId(id: string | null) {
    cartId.value = id;
    if (import.meta.client) {
      id ? localStorage.setItem(CART_ID, id) : localStorage.removeItem(CART_ID);
    }
  }

  // actions
  async function init() {
    if (!import.meta.client) return; // localStorage: browser only

    const savedId = localStorage.getItem(CART_ID);
    if (savedId) {
      cartId.value = savedId;

      await fetchCart(); // if expired fetch
    }
  }

  async function fetchCart() {
    if (!cartId.value) return;

    try {
      cart.value = await $fetch<Cart>(`/api/cart/${cartId.value}`);
    } catch {
      // reset -> fresh cart
      persistCartId(null);
      cart.value = null;
    }
  }

  async function addItem(merchandiseId: string, quantity = 1) {
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
        // cart already exists: add new item
        cart.value = await $fetch<Cart>(`/api/cart/${cartId.value}/lines`, {
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
      }
    } finally {
      isLoading.value = false;
    }
  }

  async function updateItem(lineId: string, quantity: number) {
    if (!cartId.value) return;
    isLoading.value = true;

    try {
      cart.value = await $fetch<Cart>(`/api/cart/${cartId.value}/lines`, {
        method: 'PUT',
        body: {
          lines: [
            {
              id: lineId,
              quantity,
            },
          ],
        },
      });
    } finally {
      isLoading.value = false;
    }
  }

  async function removeItem(lineId: string) {
    if (!cartId.value) return;
    isLoading.value = true;

    try {
      cart.value = await $fetch<Cart>(`/api/cart/${cartId.value}/lines`, {
        method: 'DELETE',
        body: {
          lineIds: [lineId],
        },
      });
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
