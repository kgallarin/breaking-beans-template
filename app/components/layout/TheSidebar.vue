<script setup lang="ts">
  import { vOnClickOutside } from '@vueuse/components';
  import {
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerHandle,
    DrawerOverlay,
    DrawerPortal,
    DrawerRoot,
    DrawerTitle,
  } from 'reka-ui';

  const { isSidebarOpen, closeSidebar } = useSidebar();

  const sideBarIsOpen = defineModel<boolean>('isSidebarOpen', { default: false });

  function handleClickOutside(): void {
    closeSidebar();
  }
</script>

<template>
  <drawer-root v-model:isSidebarOpen="sideBarIsOpen">
    <drawer-portal>
      <drawer-overlay>
        <drawer-content>
          <drawer-handle />
          <div>
            <drawer-title> title </drawer-title>
            <drawer-description> description </drawer-description>
          </div>
        </drawer-content>
        <drawer-close> close </drawer-close>
      </drawer-overlay>
    </drawer-portal>
  </drawer-root>
</template>
