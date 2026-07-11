import { useCartStore } from '@store/cart/cart.store';

export default defineNuxtPlugin(async (nuxtApp): Promise<void> => {
  nuxtApp.hook('app:mounted', async (): Promise<void> => {
    const { init } = useCartStore();
    await init();
  });
});
