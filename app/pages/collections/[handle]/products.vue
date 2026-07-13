<script setup lang="ts">
  import type { Product } from '~~/types/Products';

  useSeoPage({
    title: 'Enjoy Freshness',
  });
  const route = useRoute();
  const handle = computed(() => route.params.handle as string);

  const {
    collectionProducts,
    loading,
    fetchError,
    graphqlErrors,
    loadMore,
    pageInfo,
  } = useCollectionProducts(handle.value);
</script>

<template>
  <div class="collections-index">
    <div v-if="loading">Fetching data Collection Products</div>
    <div v-else-if="fetchError">HTTP Error: {{ fetchError.message }}</div>
    <div v-if="graphqlErrors.length">GraphQL Error: {{ graphqlErrors }}</div>
    <div v-else class="w-full">
      <div class="grid w-full grid-cols-2 gap-4">
        <template v-for="product in collectionProducts" :key="product?.id">
          <product-card :product="product as Product" />
        </template>
      </div>

      <base-button
        v-if="pageInfo?.hasNextPage"
        :disabled="loading"
        class="mx-auto my-12 block w-fit"
        @click.prevent.stop="loadMore"
      >
        {{ loading ? 'Loading' : 'Load more' }}
      </base-button>
    </div>
  </div>
</template>
