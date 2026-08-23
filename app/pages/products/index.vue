<script setup lang="ts">
  import ProductCard from '@components/products/ProductCard.vue';
  import type { Product } from '~~/types/Products';

  useSeoPage({
    title: 'Espresso',
  });
  const {
    products,
    loading,
    pageInfo,
    loadMore,
    status,
    fetchError,
    graphqlErrors,
  } = useProducts();
</script>

<template>
  <div class="product-index w-full">
    <div v-if="status === 'pending'">pending ...</div>
    <div class="tex h-14 text-red-300">
      {{ fetchError }}
      {{ graphqlErrors }}
    </div>
    <NuxtImg datasrc="" fetchpriority loading="eager"></NuxtImg>
    <div class="w-full">
      <div v-if="products" class="grid grid-cols-4 gap-4 py-4">
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
