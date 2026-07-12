<script setup lang="ts">
  import type { Product } from '~~/types/Products';

  useSeoPage({
    title: 'Enjoy Freshness',
  });
  const route = useRoute();
  const handle = computed(() => route.params.handle as string);
  const { items, loading, fetchError, graphqlErrors } = useCollectionProducts(
    handle.value,
  );
</script>

<template>
  <div class="collections-index">
    <div v-if="loading">Fetching data Collection Products</div>
    <div v-else-if="fetchError">HTTP Error: {{ fetchError.message }}</div>
    <div v-if="graphqlErrors.length">GraphQL Error: {{ graphqlErrors }}</div>
    <div class="w-full">
      <div class="grid w-full grid-cols-2 gap-4">
        <template v-for="product in items" :key="product?.id">
          <product-card :product="product as Product" />
        </template>
      </div>
    </div>
  </div>
</template>
