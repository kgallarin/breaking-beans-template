<script setup lang="ts">
  import {
    type MotionProps,
    motion,
    useDomRef,
    type VariantLabels,
    type TargetAndTransition,
  } from 'motion-v';
  import { useResizeObserver } from '@vueuse/core';

  const props = withDefaults(
    defineProps<{
      open?: boolean;
      theme?: string;
    }>(),
    {
      open: false,
      theme: 'light',
    },
  );

  const emit = defineEmits<{
    'animation-complete': [];
    'close-starts': [];
  }>();

  const isOpen = computed(() => props.open);
  const targetRef = useDomRef();
  const dimensions = ref({ width: 0, height: 0 });

  useResizeObserver(targetRef, (entries) => {
    const entry = entries[0];

    if (!entry) return;

    const { height, width } = entry.contentRect;
    dimensions.value = { height, width };
  });

  const navParentVariants: MotionProps['variants'] = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };

  const navItemVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: {
          stiffness: 80,
          velocity: -100,
        },
      },
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: {
          stiffness: 1000,
          velocity: -200,
        },
      },
    },
  };

  const navBgPanelVariants: MotionProps['variants'] = {
    open: (custom?: unknown) => {
      // see heightRect and dimensions
      const height = typeof custom === 'number' && custom > 0 ? custom : 1200;
      return {
        clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
        transition: {
          type: 'spring',
          stiffness: 60,
          restDelta: 1,
        },
      };
    },
    closed: {
      clipPath: 'circle(0px at 0px 0px)',
      transition: {
        delay: 0.5,
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const isAnimationStartsOrCompleted = (
    value: VariantLabels | TargetAndTransition | string | undefined,
  ) => (value === 'closed' ? emit('close-starts') : emit('animation-complete'));
</script>

<template>
  <motion.div
    ref="targetRef"
    initial="closed"
    :animate="isOpen ? 'open' : 'closed'"
    :custom="dimensions.height"
    class="relative h-full w-full"
  >
    <motion.div
      class="bg-variant bg-white"
      :animate="isOpen ? 'open' : 'closed'"
      :custom="dimensions.height"
      :variants="navBgPanelVariants"
      @animation-start="isAnimationStartsOrCompleted"
      @animation-complete="isAnimationStartsOrCompleted"
    />
    <slot
      name="stagger-navigation"
      :variants="{ navParentVariants, navItemVariants }"
    />
  </motion.div>
</template>

<style>
  .bg-variant {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    z-index: -1;
  }
</style>
