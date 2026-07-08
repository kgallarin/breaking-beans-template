<script setup lang="ts">
  import type { Product, ProductVariant } from '~~/types/Products';
  import { useCartStore } from '@store/cart/cart.store';

  defineProps<{
    product: Product;
  }>();

  const cartStore = useCartStore();
  const selectedVariant = ref<ProductVariant | null>(null);
  const quantity = ref(1);
  const productLoading = ref(false);

  const isVariantEmptyErr = ref('');
  async function addToCart() {
    isVariantEmptyErr.value = '';
    productLoading.value = true;
    if (!selectedVariant.value) {
      isVariantEmptyErr.value = 'Please select product variant.';
      return;
    }
    try {
      await cartStore.addItem(selectedVariant.value.id, quantity.value);
    } finally {
      productLoading.value = false;
    }
  }
</script>

<template>
  <div
    class="product-card flex flex-col divide-y rounded-md border border-amber-300 bg-white p-4 text-white"
  >
    <div class="flex flex-1 flex-col pb-4 text-blue-900">
      <p>{{ product?.title }}</p>
      <p>{{ product?.description }}</p>
      <p class="mt-8 text-xs">{{ product?.handle }}</p>
      <NuxtLink :to="`/products/${product.handle}`" class="hover:text-amber-300"
        >view product</NuxtLink
      >
    </div>
    <div class="flex flex-col py-4">
      <pre>Select variant</pre>
      <p v-if="!selectedVariant" class="mb-4 text-xs text-red-400">
        {{ isVariantEmptyErr }}
      </p>
      <div class="">
        <base-button
          v-for="variant in product?.variants?.nodes"
          :key="variant.id"
          :class="[
            'w-fit rounded border px-3 py-1 text-sm',
            selectedVariant?.id === variant.id
              ? 'border-black bg-gray-900 text-white'
              : 'border-gray-300 bg-white text-blue-900',
          ]"
          @click.prevent.stop="selectedVariant = variant"
        >
          {{ variant.title }}
        </base-button>
      </div>
    </div>

    <div class="mx-auto flex w-full max-w-xs justify-between py-4">
      <base-button
        label="-"
        type="button"
        @click.prevent.stop="quantity = Math.max(1, quantity - 1)"
      />
      <span class="text-blue-900">{{ quantity }}</span>
      <base-button label="+" type="button" @click.prevent.stop="quantity++" />
    </div>

    <base-button
      :loading="productLoading"
      :disabled="cartStore.isLoading"
      label="Add to cart"
      type="button"
      class="mx-auto mt-4 w-full bg-black"
      @click.prevent.stop="addToCart"
    />
  </div>
</template>
