<script setup lang="ts">
  import { vOnClickOutside } from '@vueuse/components';

  const { isSidebarOpen, closeSidebar } = useSidebar();

  function handleClickOutside(): void {
    closeSidebar();
  }

  // const open = defineModel<boolean>('open', { default: false });
</script>

<template>
  <template v-if="isSidebarOpen">
    <div
      v-on-click-outside="handleClickOutside"
      class="sidebar-main fixed right-0 z-40 h-full w-1/2 bg-white"
    >
      <div class="sidebar-inner p-8">hello I am sidebar.</div>
    </div>
  </template>
</template>
