<script setup lang="ts">
  import { useAuthStore } from '~/stores/auth/auth.store';

  const { customer, logout } = useAuthStore();
</script>

<template>
  <div class="profile p-8">
    <pre>Hello {{ customer?.firstName }}</pre>
    <p>{{ customer?.emailAddress?.emailAddress }}</p>

    <base-button label="logout" @click="logout" />
  </div>
</template>

<style scoped></style>
