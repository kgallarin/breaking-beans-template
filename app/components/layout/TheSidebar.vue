<script setup lang="ts">
  const { isOpen } = useSidebar();
</script>

<template>
  <div v-if="isOpen" class="fixed left-0 w-1/2">
    <!--   @todo: tobe component-->
    I am the sidebar
  </div>
</template>
