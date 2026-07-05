<script setup lang="ts">
  import { useMergedAttrs } from '~/composables/styles/useMergedAttrs';

  withDefaults(
    defineProps<{
      label?: string;
      loading?: boolean;
      type?: 'button' | 'submit' | 'reset';
    }>(),
    {
      label: '',
      loading: false,
      type: 'button',
    },
  );

  defineOptions({
    inheritAttrs: false,
  });

  const buttonDefaultStyles =
    'cursor-pointer rounded-md bg-gray-400 px-4 py-2 text-sm text-white';

  const buttonAttrs = useMergedAttrs(() => buttonDefaultStyles);
</script>

<template>
  <button :type="type" v-bind="buttonAttrs">
    <span v-if="label">
      {{ loading ? 'loading' : label }}
    </span>
    <slot v-else :loading="loading" />
  </button>
</template>
