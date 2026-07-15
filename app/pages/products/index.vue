<script setup lang="ts">
  import ProductCard from '@components/products/ProductCard.vue';
  import type { Product } from '~~/types/Products';

  useSeoPage({
    title: 'Espresso',
  });
  const { products, loading, fetchError, pageInfo, loadMore } = useProducts();
</script>

<template>
  <div class="product-index w-full">
    <div v-if="loading">Fetching Shopify Data...</div>
    <div v-else-if="fetchError">HTTP Error: {{ fetchError.message }}</div>

    <div v-else class="w-full">
      <div class="grid grid-cols-2 gap-4 py-4">
        <template v-for="product in products" :key="product?.id">
          <product-card :product="product as Product" />
        </template>
      </div>

      <base-button
        v-if="pageInfo?.hasNextPage"
        :disabled="loading"
        class="mx-auto my-12 block w-fit"
        @click.prevent.stop="loadMore"
      >
        {{ loading ? 'Loading' : 'Load more products' }}
      </base-button>
    </div>
  </div>
</template>
