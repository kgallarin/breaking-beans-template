<script lang="ts" setup>
  definePageMeta({
    layout: 'minimal',
  });

  const username = ref('');
  const password = ref('');

  function submitLogin() {
    console.log('login submitted!');
  }
</script>

<template>
  <div class="mx-auto h-full w-full max-w-lg">
    <div class="flex h-full flex-col justify-center gap-4">
      <h1 class="mb-4 text-center">Welcome back!</h1>
      <base-input
        v-model="username"
        placeholder="username or email"
        class="bg-amber-100 p-8"
        error="wag bobo"
      />
      <base-input v-model="password" placeholder="password" />
      <base-button type="button" label="login" />
    </div>
  </div>
</template>
