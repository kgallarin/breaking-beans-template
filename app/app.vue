<script setup lang="ts">
  import { useAuthStore } from '~/stores/auth/auth.store';

  useSeoMeta({
    titleTemplate: '%s | Breaking Beans Philippines',
    ogType: 'website',
    ogSiteName: 'Breaking Beans',
    robots: 'index, follow',
  });

  const authStore = useAuthStore();

  await callOnce('init', async () => {
    await Promise.all([authStore.fetchCustomer()]);
  });
</script>

<template>
  <div data-testid="app-root" class="h-full">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
