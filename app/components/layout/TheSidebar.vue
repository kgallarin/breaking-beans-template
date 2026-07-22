<script setup lang="ts">
  import type { NavLink } from '~~/types/App';
  import { motion, stagger } from 'motion-v';
  import { onClickOutside } from '@vueuse/core';

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

  const sidebar = ref<HTMLDivElement | null>(null);
  const staggeredAnimation = ref(false);
  onClickOutside(sidebar, () => {
    closeSidebar();
  });

  function handleAnimationCompleted(value: boolean) {
    staggeredAnimation.value = value;
  }

  // const itemLinkContainerVariants = {
  //   closed: { opacity: 0 },
  //   open: {
  //     opacity: 1,
  //     transition: {
  //       delayChildren: stagger(0.1, { startDelay: 0.5 }),
  //     },
  //   },
  // };
  //
  // const itemLinkVariants = {
  //   closed: { opacity: 0, y: 10 },
  //   open: { opacity: 1, y: 0 },
  // };

  onBeforeUnmount(() => closeSidebar());
</script>

<template>
  <motion.nav
    :initial="'closed'"
    :animate="isOpen ? 'open' : 'closed'"
    class="fixed top-0 left-0 z-50 h-full w-1/2"
    :class="{
      'drop-shadow-md': staggeredAnimation,
      'pointer-events-none': !isOpen,
    }"
  >
    <div
      ref="sidebar"
      class="sidebar-container h-full transition-opacity duration-300"
    >
      <staggering-vertical-nav
        :open="isOpen"
        @animation-complete="handleAnimationCompleted(true)"
        @close-starts="handleAnimationCompleted(true)"
      >
        <template
          #stagger-navigation="{ variants: { navParentVariants, navItemVariants } }"
        >
          <motion.ul class="nav-list text-blue-500" :variants="navParentVariants">
            <motion.li
              class="nav-list-item"
              :variants="navItemVariants"
              :while-press="{ scale: 0.95 }"
            >
              Item one
            </motion.li>
            <motion.li
              class="nav-list-item"
              :variants="navItemVariants"
              :while-press="{ scale: 0.95 }"
            >
              Item two
            </motion.li>
            <motion.li
              class="nav-list-item"
              :variants="navItemVariants"
              :while-press="{ scale: 0.95 }"
            >
              Item three
            </motion.li>
          </motion.ul>
        </template>
      </staggering-vertical-nav>
    </div>
  </motion.nav>
</template>
