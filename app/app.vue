<script setup lang="ts">
  import { useAuthStore } from '~/stores/auth/auth.store';
  import { ConfigProvider } from 'reka-ui';

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
    <ConfigProvider>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </ConfigProvider>
  </div>
</template>
