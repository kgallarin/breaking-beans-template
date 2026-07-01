<script setup lang="ts">
  import type { NavLink } from '~~/types/App';

  const navLinks: ComputedRef<NavLink[]> = computed(() => [
    {
      label: 'home',
      href: '/',
      auth: false,
    },
  ]);
</script>

<template>
  <nav class="create-base-nav-list">
    {{ navLinks }}
  </nav>
  This is the footer
</template>
