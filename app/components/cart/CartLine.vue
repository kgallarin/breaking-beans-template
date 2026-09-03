<script setup lang="ts">
  import type { CartLine } from '@/types/Cart';

  const props = withDefaults(
    defineProps<{
      cartLine: CartLine;
    }>(),
    {},
  );

  const {
    itemCount,
    subTotal,
    checkOutUrl,
    isLoading,
    handleMoneyFormat,
    handleQuantityChange,
    removeItem,
    updateItem,
  } = useCart();
</script>

<template>
  <li class="flex gap-4 px-6 py-4">
    <img
      v-if="cartLine.merchandise.product.featuredImage"
      class="max-w-40"
      :src="cartLine.merchandise.product.featuredImage.url"
      :alt="
        cartLine.merchandise.product.featuredImage.altText ??
        cartLine.merchandise.product.title
      "
    />

    <div class="details flex-flex-1 flex-col gap-1">
      <NuxtLink
        :to="`/products/${cartLine.merchandise.product.handle}`"
        class="text-sm"
      >
        {{ cartLine.merchandise.title }}
      </NuxtLink>

      <p class="text-xs text-gray-500">
        {{ handleMoneyFormat(cartLine.merchandise.price) }} each
      </p>

      <div class="mt-1 flex items-center gap-2">
        <base-button
          label="-"
          type="button"
          :disabled="isLoading"
          @click.prevent.stop="updateItem(cartLine.id, cartLine.quantity - 1)"
        />
        <base-input
          type="number"
          :model-value="cartLine.quantity"
          min="1"
          :disabled="isLoading"
          @input="handleQuantityChange(cartLine.id, $event)"
        />
        <base-button
          label="+"
          type="button"
          :disabled="isLoading"
          @click.prevent.stop="updateItem(cartLine.id, cartLine.quantity + 1)"
        />
      </div>
    </div>

    <div class="flex flex-col items-end justify-between">
      <p class="text-sm">
        {{ handleMoneyFormat(cartLine.cost.totalAmount) }}
      </p>

      <base-button
        type="button"
        class="remove-item-button bg-white text-xs text-red-400 underline"
        :disabled="isLoading"
        @click="removeItem(cartLine.id)"
      >
        Remove
      </base-button>
    </div>
  </li>
</template>
