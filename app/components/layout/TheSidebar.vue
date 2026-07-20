<script setup lang="ts">
  import type { NavLink } from '~~/types/App';
  import { motion, stagger } from 'motion-v';

  withDefaults(
    defineProps<{
      nav: NavLink[];
      theme?: string;
    }>(),
    {
      theme: 'light',
    },
  );
  const { isOpen, closeSidebar } = useSidebar();

  // @todo put into composable
  let openTimeout: ReturnType<typeof setTimeout> | null = null;
  watch(isOpen, (newVal) => {
    if (newVal) {
      if (openTimeout) clearTimeout(openTimeout);

      openTimeout = setTimeout(() => {
        openTimeout = null;
      }, 500);
    } else {
      if (openTimeout) {
        clearTimeout(openTimeout);
        openTimeout = null;
      }
    }
  });

  const itemLinkContainerVariants = {
    closed: { opacity: 0 },
    open: {
      opacity: 1,
      transition: {
        delayChildren: stagger(0.1, { startDelay: 0.5 }),
      },
    },
  };

  const itemLinkVariants = {
    closed: { opacity: 0, y: 10 },
    open: { opacity: 1, y: 0 },
  };

  onBeforeUnmount(() => {
    closeSidebar();
    if (!isOpen.value) {
      
    }
  })
</script>

<template>
  <div v-if="isOpen" class="fixed left-0 w-1/2">
    <!--   @todo: tobe component-->
    I am the sidebar
  </div>
</template>
