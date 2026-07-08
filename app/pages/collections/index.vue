<script setup lang="ts">
  useSeoPage({
    title: 'Collections',
  });

  const { items, loading, fetchError } = useCollections();
</script>

<template>
  <div class="collections-index">
    <div v-if="loading">Fetching data Collections</div>
    <div v-else-if="fetchError">HTTP Error: {{ fetchError.message }}</div>

    <div v-else class="my-4 grid w-full grid-cols-2 gap-4">
      <div v-for="item in items" :key="item?.id">
        <div class="bg-amber-50 p-4">
          <h1>{{ item?.title }}</h1>
          {{ item?.handle }}
          <p>{{ item?.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
