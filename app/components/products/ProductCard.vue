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
    class="product-card flex w-full flex-col divide-y rounded-md border border-amber-300 bg-white p-2 text-white"
  >
    <div class="flex flex-1 flex-col pb-4 text-blue-900">
      <div class="img-wrapper mb-4 h-55 w-full">
        <img
          v-if="product?.featuredImage"
          :src="product?.featuredImage?.url"
          :alt="product?.featuredImage?.altText ?? ''"
          class="mb-4 h-full w-full rounded-t-md object-cover"
        />
      </div>
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
      <div class="flex gap-4">
        <template v-for="variant in product?.variants?.nodes" :key="variant.id">
          <div class="flex flex-col p-2">
            <div>
              <p class="mb-4 text-xs text-blue-900">
                <span>
                  {{ variant.availableForSale ? 'available' : 'out of stock' }}
                </span>
                <fa-icon
                  :icon="['fa', 'check-circle']"
                  :class="[
                    variant.availableForSale ? 'text-green-300' : 'text-red-400',
                    'text-xs',
                  ]"
                />
              </p>
            </div>
            <base-button
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
        </template>
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
