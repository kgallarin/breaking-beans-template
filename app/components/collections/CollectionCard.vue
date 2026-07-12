<script setup lang="ts">
  defineProps<{
    collection: Collection;
    loading: boolean;
  }>();
</script>

<template>
  <div>
    <div v-if="loading">loading ...</div>
    <div v-else class="bg-amber-50 p-4">
      <NuxtLink
        :to="`/collections/${collection?.handle}`"
        class="mb-2 font-mono text-xl underline"
        >{{ collection?.title }}</NuxtLink
      >
      <div class="divide-y">
        <p>{{ collection?.handle }}</p>
        <p>{{ collection?.description }}</p>
      </div>
    </div>
  </div>
</template>
