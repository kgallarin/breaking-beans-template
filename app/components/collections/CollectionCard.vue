<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      collection: Collection;
      navigateHandle?: boolean;
      loading?: boolean;
    }>(),
    {
      navigateHandle: false,
      loading: false,
    },
  );

  function handleNavigate() {
    if (!props.navigateHandle) return;

    navigateTo(`/collections/${props.collection?.handle}`);
  }
</script>

<template>
  <div>
    <div v-if="loading">loading ...</div>
    <div v-else class="bg-amber-50 p-4">
      <div class="flex justify-between">
        <div
          class="mb-2 cursor-pointer font-mono text-xl underline"
          @click.prevent.stop="handleNavigate"
        >
          {{ collection?.title }}
        </div>
        <NuxtLink
          :to="`/collections/${collection?.handle}/products`"
          class="text-blue-400"
        >
          view products
        </NuxtLink>
      </div>
      <div class="divide-y">
        <p>{{ collection?.handle }}</p>
        <p>{{ collection?.description }}</p>
      </div>
    </div>
  </div>
</template>
