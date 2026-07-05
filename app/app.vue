<script setup lang="ts">
  useSeoMeta({
    titleTemplate: '%s | Breaking Beans Philippines',
    ogType: 'website',
    ogSiteName: 'Breaking Beans',
    robots: 'index, follow',
  });
</script>

<template>
  <div data-testid="app-root" class="h-full">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
