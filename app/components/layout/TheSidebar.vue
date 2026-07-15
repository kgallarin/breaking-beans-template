<script setup lang="ts">
  import { useAppStore } from '@store/app/app.store';
  import { vOnClickOutside } from '@vueuse/components';

  // const appStore = useAppStore();
  // const { isSidebarOpen } = storeToRefs(appStore);
  const { triggerSidebar, isSidebarOpen, closeSidebar } = useSidebar();

  function handleClickOutside(): void {
    // appStore.closeSidebar();
    closeSidebar();
  }

  // const open = defineModel<boolean>('open', { default: false });
</script>

<template>
  <template v-if="isSidebarOpen">
    <div
      class="sidebar-main fixed right-0 z-40 h-full w-1/2 bg-white"
      v-on-click-outside="handleClickOutside"
    >
      <div class="sidebar-inner p-8">hello I am sidebar.</div>
    </div>
  </template>
</template>
