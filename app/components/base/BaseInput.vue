<script lang="ts" setup>
  import { clsx } from 'clsx';

  const props = withDefaults(
    defineProps<{
      label?: string;
      type?: string;
      error?: string;
      placeholder?: string;
    }>(),
    {
      label: '',
      type: '',
      error: '',
      placeholder: '',
    },
  );

  defineOptions({
    inheritAttrs: false,
  });

  const model = defineModel<string | number>();

  const attrs = useAttrs();
  const defaultInputStyles = clsx(
    'h-10 p-2 bg-white rounded-md border',
    props.error ? 'border-red-400' : 'border-gray-300',
  );
  const inputAttrs = computed(() => ({
    ...attrs,
    class: stylesMerger(defaultInputStyles, attrs.class),
  }));
</script>

<template>
  <div class="flex flex-col gap-y-1.5">
    <label :for="($attrs.id as string) || label">
      {{ label }}
    </label>

    <textarea
      v-if="type === 'textarea'"
      :id="($attrs.id as string) || label"
      v-bind="inputAttrs"
      v-model="model"
      cols="15"
      :placeholder="placeholder"
      rows="5"
    />

    <input
      :id="($attrs.id as string) || label"
      v-model="model"
      v-bind="inputAttrs"
      :placeholder="placeholder"
      :type="type"
    />

    <p class="text-xs">{{ error }}</p>
  </div>
</template>
