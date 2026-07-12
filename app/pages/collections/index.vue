<script setup lang="ts">
  import CollectionCard from '@components/collections/CollectionCard.vue';

  useSeoPage({
    title: 'Collections',
  });

  const { items, loading, fetchError } = useCollections();
</script>

<template>
  <div class="collections-index w-full">
    <div v-if="loading">Fetching data Collections</div>
    <div v-else-if="fetchError">HTTP Error: {{ fetchError.message }}</div>

    <div v-else class="grid grid-cols-3 gap-4 py-4">
      <template v-for="collection in items" :key="collection?.id">
        <collection-card :collection="collection as Collection" :loading="loading" />
      </template>
    </div>
  </div>
</template>
