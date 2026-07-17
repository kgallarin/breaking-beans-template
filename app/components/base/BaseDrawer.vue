<script setup lang="ts">
  import {
    DrawerContent,
    DrawerOverlay,
    DrawerPortal,
    DrawerRoot,
    DrawerTitle,
  } from 'reka-ui';

  const drawer = useDrawer();

  const modelOpen = computed({
    get: () => drawer.isOpen.value,
    set: (val) => {
      if (!val) drawer.closeDrawer();
    },
  });
</script>

<template>
  <drawer-root v-model:open="modelOpen" :swipe-direction="drawer.direction.value">
    <drawer-portal defer>
      <drawer-overlay class="drawer-overlay" />
      <drawer-content
        class="drawer-content p-4"
        :data-direction="drawer.direction.value"
        disable-outside-pointer-events
      >
        <drawer-title class="text-center text-lg capitalize">
          {{ drawer.title.value ?? 'Drawer' }}
        </drawer-title>
        <div v-if="drawer.activeComponent.value" class="drawer-scroll-area">
          <component
            :is="drawer.activeComponent.value"
            v-bind="drawer.componentProps.value"
          />
        </div>
      </drawer-content>
    </drawer-portal>
  </drawer-root>
</template>
