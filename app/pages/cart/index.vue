<script setup lang="ts">
  // @todo: make a full-drawer cart

  import { useCartStore } from '@store/cart/cart.store';

  const cartStore = useCartStore();

  const {
    items: cartItems,
    subTotal,
    checkOutUrl,
    isLoading,
    itemCount,
  } = storeToRefs(cartStore);

  function handleMoneyFormat(
    money: { amount: string; currencyCode: string } | null,
  ) {
    if (!money) return '';

    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: money.currencyCode,
    }).format(parseFloat(money.amount));
  }

  function handleQuantityChange(lineId: string, event: Event) {
    const input = event.target as HTMLInputElement;
    const newQuantity = parseInt(input.value, 10);

    if (newQuantity >= 1) {
      cartStore.updateItem(lineId, newQuantity);
    }
  }
</script>

<template>
  <div class="mx-auto flex h-full max-w-md min-w-md flex-col">
    <div class="flex items-center justify-between border-b px-6 py-4">
      <h2>Cart Items: {{ itemCount }}</h2>
    </div>

    <div
      v-if="cartItems.length === 0"
      class="flex flex-1 items-center justify-center"
    >
      <p class="text-gray-400">Your cart is empty. Add more!</p>
    </div>

    <ul v-else class="flex-1 divide-y overflow-y-auto">
      <li v-for="line in cartItems" :key="line.id" class="flex gap-4 px-6 py-4">
        <img
          v-if="line.merchandise.product.featuredImage"
          :src="line.merchandise.product.featuredImage.url"
          :alt="
            line.merchandise.product.featuredImage.altText ??
            line.merchandise.product.title
          "
        />

        <div class="details flex-flex-1 flex-col gap-1">
          <NuxtLink
            :to="`/products/${line.merchandise.product.handle}`"
            class="text-sm"
          >
            {{ line.merchandise.title }}
          </NuxtLink>

          <p class="text-xs text-gray-500">
            {{ handleMoneyFormat(line.merchandise.price) }} each
          </p>

          <div class="mt-1 flex items-center gap-2">
            <base-button
              label="-"
              type="button"
              :disabled="isLoading"
              @click.prevent.stop="cartStore.updateItem(line.id, line.quantity - 1)"
            />

            <base-input
              type="number"
              :value="line.quantity"
              min="1"
              :disabled="isLoading"
              @change="handleQuantityChange(line.id, $event)"
            />

            <base-button
              label="+"
              type="button"
              :disabled="isLoading"
              @click.prevent.stop="cartStore.updateItem(line.id, line.quantity + 1)"
            />
          </div>
        </div>

        <div class="flex flex-col items-end justify-between">
          <p class="text-sm">
            {{ handleMoneyFormat(line.cost.totalAmount) }}
          </p>

          <base-button
            type="button"
            class="remove-item-button bg-white text-xs text-red-400 underline"
            :disabled="isLoading"
            @click="cartStore.removeItem(line.id)"
          >
            Remove
          </base-button>
        </div>
      </li>
    </ul>

    <!-- cart footer-->
    <div v-if="cartItems.length > 0" class="border-t px-6 py-4">
      <div class="mb-4 flex justify-between text-sm">
        <span>Subtotal</span>
        <span>
          {{ handleMoneyFormat(subTotal) }}
        </span>
      </div>
    </div>

    <a
      v-if="checkOutUrl"
      :href="checkOutUrl"
      class="block w-full rounded bg-black py-3 text-center text-white"
    >
      Checkout
    </a>
  </div>
</template>

<style scoped></style>
