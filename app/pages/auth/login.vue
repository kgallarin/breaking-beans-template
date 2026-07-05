<script lang="ts" setup>
  definePageMeta({
    layout: 'minimal',
    middleware: 'guest',
  });

  const loading = ref(false);
  function loginWithShopify() {
    loading.value = true;
    window.location.href = '/api/auth/login';
  }
</script>

<template>
  <div class="mx-auto h-full w-full max-w-lg">
    <div class="flex h-full flex-col justify-center gap-4">
      <h1 class="mb-4 text-center">Welcome back!</h1>
      <!--      <base-input v-model="username" placeholder="username or email" />-->
      <!--      <base-input v-model="password" placeholder="password" />-->
      <base-button
        :loading="loading"
        class="bg-blue-950"
        label="login with Shopify!"
        type="button"
        @click.prevent.stop="loginWithShopify"
      />
    </div>
  </div>
</template>
