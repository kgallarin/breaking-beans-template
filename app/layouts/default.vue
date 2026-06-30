<script setup lang="ts">
  import TheHeaderNav from '~/components/layout/TheHeaderNav.vue';
  import TheFooter from '~/components/layout/TheFooter.vue';
</script>
<template>
  <div data-testid="d-layout">
    <the-header-nav />
    <slot />
    <the-footer />
  </div>
</template>
