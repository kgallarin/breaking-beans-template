<script setup lang="ts">
  import CollectionCard from '@components/collections/CollectionCard.vue';
  import type { Collection } from '~~/types/Collection';

  useSeoPage({
    title: 'Collections',
  });

  const { items, loading } = useCollections();
</script>

<template>
  <div class="collections-index w-full">
    <!--    <div v-if="loading">Fetching data Collections</div>-->
    <!--    <div v-else-if="fetchError">HTTP Error: {{ fetchError.message }}</div>-->

    <!--    <div v-else class="grid grid-cols-3 gap-4 py-4">-->
    <template v-for="collection in items" :key="collection?.id">
      <collection-card
        :collection="collection as Collection"
        :loading="loading"
        navigate-handle
      />
    </template>
  </div>
  <!--  </div>-->
</template>
