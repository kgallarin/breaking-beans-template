<script setup lang="ts">
  defineOptions({
    name: 'CartView',
    drawerTitle: 'Your Shopping Cart',
  });

  const { cartItems, itemCount, subTotal, checkOutUrl, handleMoneyFormat } =
    useCart();
</script>

<template>
  <div class="mx-auto flex h-full w-full flex-col p-4">
    <div class="flex items-center justify-between border-b px-6 py-4">
      <h1>Cart Items: {{ itemCount }}</h1>
    </div>

    <div
      v-if="cartItems.length === 0"
      class="flex flex-1 items-center justify-center"
    >
      <p class="text-gray-400">Your cart is empty. Add more!</p>
    </div>

    <ul v-else class="max-h-[70vh] flex-1 divide-y overflow-y-auto">
      <cart-line v-for="line in cartItems" :key="line.id" :cart-line="line" />
    </ul>

    <!-- cart footer-->
    <div v-if="cartItems.length > 0" class="border-t px-6 py-4">
      <div class="mb-4 flex justify-between text-sm">
        <span>Subtotal</span>
        <span>
          {{ handleMoneyFormat(subTotal) }}
        </span>
      </div>
    </div>

    <a
      v-if="checkOutUrl"
      :href="checkOutUrl"
      class="block w-full rounded bg-black py-3 text-center text-white"
    >
      Checkout
    </a>
  </div>
</template>

<style scoped></style>
