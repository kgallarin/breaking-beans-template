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
      <pre>{{ items }}</pre>

      <h3>Loop Output:</h3>
      <ul>
        <li v-for="product in items" :key="product?.id">
          {{ product?.title }}
        </li>
      </ul>
    </div>
  </div>
</template>
