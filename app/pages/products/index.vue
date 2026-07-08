<script setup lang="ts">
  useSeoPage({
    title: 'Espresso',
  });
  const { items, loading, fetchError } = useProducts();
</script>

<template>
  <div class="product-index">
    <div v-if="loading">Fetching Shopify Data...</div>
    <div v-else-if="fetchError">HTTP Error: {{ fetchError.message }}</div>

    <div v-else>
      <h3>Raw Output:</h3>

      <h3>Loop Output:</h3>
      <ul class="grid grid-cols-2 gap-4">
        <li
          v-for="(product, index) in items"
          :key="product?.id"
          class="bg-blue-400 p-4 text-white"
        >
          <p>Product {{ index }}</p>
          <p>{{ product?.title }}</p>
          <p>{{ product?.description }}</p>
          <p>handle: {{ product?.handle }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
