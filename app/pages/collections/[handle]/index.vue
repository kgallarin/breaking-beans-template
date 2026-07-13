<script setup lang="ts">
  import type { Collection } from '~~/types/Collection';

  useSeoPage({
    title: 'Enjoy Freshness',
  });
  const route = useRoute();
  const handle = computed(() => route.params.handle as string);

  // single collection
  const {
    data: collectionItem,
    loading,
    fetchError,
    graphqlErrors,
  } = useCollection(handle.value);
</script>

<template>
  <div class="collections-index">
    <div v-if="fetchError">HTTP Error: {{ fetchError.message }}</div>
    <div v-if="graphqlErrors.length">GraphQL Error: {{ graphqlErrors }}</div>

    <div class="w-full">
      <collection-card
        :collection="collectionItem as Collection"
        :loading="loading"
      />
    </div>
  </div>
</template>

<style scoped></style>
