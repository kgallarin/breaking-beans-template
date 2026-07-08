<script setup lang="ts">
  import { useCartStore } from '@store/cart/cart.store';
  import ProductCard from '@components/products/ProductCard.vue';
  import type { Product } from '~~/types/Products';

  useSeoPage({
    title: 'Espresso',
  });
  const cartStore = useCartStore();
  const { items: products, loading, fetchError } = useProducts();
</script>

<template>
  <div class="product-index mx-auto max-w-3xl min-w-lg">
    <div v-if="loading">Fetching Shopify Data...</div>
    <div v-else-if="fetchError">HTTP Error: {{ fetchError.message }}</div>

    <div v-else>
      <div class="grid grid-cols-2 gap-4 py-4">
        <template v-for="product in products" :key="product?.id">
          <product-card :product="product as Product" />
        </template>
      </div>
    </div>
  </div>
</template>
