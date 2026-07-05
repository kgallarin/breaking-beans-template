<script lang="ts" setup>
  definePageMeta({
    layout: 'minimal',
  });

  const username = ref('');
  const password = ref('');

  function submitLogin() {}
</script>

<template>
  <div class="mx-auto h-full w-full max-w-lg">
    <div class="flex h-full flex-col justify-center gap-4">
      <h1 class="mb-4 text-center">Welcome back!</h1>
      <base-input v-model="username" placeholder="username or email" />
      <base-input v-model="password" placeholder="password" />
      <base-button type="button" label="login" @click.prevent.stop="submitLogin" />
    </div>
  </div>
</template>
