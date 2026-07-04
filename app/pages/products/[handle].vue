<script setup lang="ts">
  const route = useRoute();
  const handle = computed(() => route.params.handle as string);
  useSeoPage({
    title: handle,
  });

  const { data } = useProduct(handle.value);
</script>

<template>
  <div class="my-4 bg-amber-100 p-4">
    <pre class="underline">Product single</pre>
    <h1>{{ data?.title }}</h1>
    <p>{{ data?.description }}</p>
  </div>
</template>

<style scoped></style>
