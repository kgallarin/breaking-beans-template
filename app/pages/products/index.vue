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
        <li v-for="(product, index) in items" :key="product?.id" class="bg-black text-white">
          <p>Product {{ index }}</p>
          <p>{{ product?.title }}</p>
          <p>{{ product?.description }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
