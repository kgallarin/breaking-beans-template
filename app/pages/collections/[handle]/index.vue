<script setup lang="ts">
  useSeoPage({
    title: 'Enjoy Freshness',
  });
  const route = useRoute();
  const handle = route.params.handle;
  const { data, loading, fetchError, graphqlErrors } = useCollectionProducts(
    handle as string,
  );
</script>

<template>
  <div class="collections-index">
    <div v-if="loading">Fetching data Collection Products</div>
    <div v-else-if="fetchError">HTTP Error: {{ fetchError.message }}</div>
    <div v-if="graphqlErrors.length">GraphQL Error: {{ graphqlErrors }}</div>

    <div class="w-full">
      <h1 class="capitalize">Collection name: {{ handle }}</h1>
      <div class="grid w-full grid-cols-2 gap-4">
        <div v-for="item in data?.nodes" :key="item.id" class="bg-gray-100 p-4">
          <p>
            {{ item?.title }}
          </p>
          <p>
            {{ item?.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
