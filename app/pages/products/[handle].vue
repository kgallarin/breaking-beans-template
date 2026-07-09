<script setup lang="ts">
  import { useCartStore } from '@store/cart/cart.store';
  import type { ProductVariant } from '~~/types/Products';

  const route = useRoute();
  const handle = computed(() => route.params.handle as string);
  useSeoPage({
    title: handle,
  });

  const { data } = useProduct(handle.value);

  const cartStore = useCartStore();

  const selectedVariant = ref<ProductVariant | null>(null);

  const quantity = ref(1);

  async function addToCart() {
    if (!selectedVariant.value) return;

    await cartStore.addItem(selectedVariant.value.id, quantity.value);
  }
</script>

<template>
  <div class="mx-auto my-4 w-full p-4 text-center text-blue-900">
    <pre class="mb-8 underline">{{ data?.title }}</pre>
    <p>{{ data?.description }}</p>

    <div class="flex flex-col gap-2 py-12">
      <!--  variant selector-->
      <div class="flex flex-col justify-center gap-4 py-4">
        <p>Available Variants:</p>
        <div
          :class="
            (data?.variants?.nodes.length ?? 0) > 1
              ? 'grid grid-cols-3 gap-4'
              : 'flex justify-center'
          "
        >
          <base-button
            v-for="variant in data?.variants?.nodes"
            :key="variant.id"
            :class="[
              'w-fit rounded border px-3 py-1 text-sm',
              selectedVariant?.id === variant.id
                ? 'border-black bg-gray-900 text-white'
                : 'border-gray-300',
            ]"
            @click.prevent.stop="selectedVariant = variant"
          >
            {{ variant.title }}
          </base-button>
        </div>
      </div>

      <!-- quantity input-->
      <div class="mx-auto my-8 flex w-full max-w-xs justify-between">
        <base-button
          label="-"
          type="button"
          @click.prevent.stop="quantity = Math.max(0, quantity - 1)"
        />
        <span>{{ quantity }}</span>
        <base-button label="+" type="button" @click.prevent.stop="quantity++" />
      </div>

      <base-button
        :loading="cartStore.isLoading"
        :disabled="!selectedVariant || cartStore.isLoading"
        label="Add to cart"
        type="button"
        class="mx-auto my-12 w-fit"
        @click.prevent.stop="addToCart"
      />

      <p v-if="!selectedVariant" class="mx-0 px-0 text-center text-sm text-gray-600">
        Please select a variant
      </p>
    </div>
  </div>
</template>

<style scoped></style>
