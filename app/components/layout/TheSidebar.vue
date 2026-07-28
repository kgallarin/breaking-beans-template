<script setup lang="ts">
  import { motion } from 'motion-v';

  withDefaults(
    defineProps<{
      // nav: NavLink[];
      theme?: string;
    }>(),
    {
      theme: 'light',
    },
  );

  const { isOpen, sidebar } = useSidebar();

  // for drop-shadow rasterize once, not every frame animation
  const staggeredAnimation = ref(false);
  function handleAnimationCompleted(value: boolean) {
    staggeredAnimation.value = value;
  }

  const isMounted = ref(false);
  onMounted(() => {
    isMounted.value = true;
  });
</script>

<template>
  <motion.nav
    aria-label="App Sidebar"
    initial="closed"
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
          <motion.ul
            v-if="isMounted"
            class="nav-list text-blue-500"
            :variants="navParentVariants"
          >
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
          <!-- fallback for hydration -->
          <ul v-else class="nav-list hidden text-blue-500">
            <li class="nav-list-item">Item one</li>
            <li class="nav-list-item">Item two</li>
            <li class="nav-list-item">Item three</li>
          </ul>
        </template>
      </staggering-vertical-nav>
    </div>
  </motion.nav>
</template>
