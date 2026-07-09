import { useCartStore } from '@store/cart/cart.store';

export default defineNuxtPlugin(async (): Promise<void> => {
  const { init } = useCartStore();

  await init();
});
