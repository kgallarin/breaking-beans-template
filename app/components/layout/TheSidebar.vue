<script setup lang="ts">
  import type { NavLink } from '~~/types/App';
  import { motion, stagger } from 'motion-v';

  withDefaults(
    defineProps<{
      // nav: NavLink[];
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
  });
</script>

<template>
  <!--  <div v-if="isOpen" class="fixed left-0 w-1/2">-->
  <!--    &lt;!&ndash;   @todo: tobe component&ndash;&gt;-->
  <!--    I am the sidebar-->
  <!--  </div>-->
  <motion.nav
    :initial="'closed'"
    :animate="isOpen ? 'open' : 'closed'"
    class="fixed top-0 left-0 z-50 h-full w-1/2 bg-amber-500"
    :class="{
      'shadow-inner drop-shadow-xl': isOpen,
      'pointer-events-none': !isOpen,
    }"
  >
    <div class="sidebar-container h-full transition-opacity duration-300">
      <staggering-vertical-nav :nav-items="[]" :open="isOpen">
        <template
          #stagger-navigation="{ variants: { navParentVariants, navItemVariants } }"
        >
          <motion.ul :variants="navParentVariants" class="text-blue-500">
            <motion.li :variants="navItemVariants" :while-press="{ scale: 0.95 }">
              Item one
            </motion.li>
            <motion.li :variants="navItemVariants" :while-press="{ scale: 0.95 }">
              Item two
            </motion.li>
            <motion.li :variants="navItemVariants" :while-press="{ scale: 0.95 }">
              Item three
            </motion.li>
          </motion.ul>
        </template>
      </staggering-vertical-nav>
    </div>
  </motion.nav>
</template>
