import { useCartStore } from '@store/cart/cart.store.ts';

export function useCart() {
  const cartStore = useCartStore();
  const {
    items: cartItems,
    subTotal,
    checkOutUrl,
    isLoading,
    itemCount,
  } = storeToRefs(cartStore);

  function handleMoneyFormat(
    money: { amount: string; currencyCode: string } | null,
  ): string {
    if (!money || !money.currencyCode) {
      // eslint-disable-next-line no-console
      console.warn('[useCart:handleMoneyFormat]: Invalid Money Object', money);
      return '';
    }

    try {
      return new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: money.currencyCode,
      }).format(parseFloat(money.amount));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('[useCart:handleMoneyFormat]: Format failed', money, error);
      return '';
    }
  }

  function handleQuantityChange(lineId: string, event: Event): void {
    const input = event.target as HTMLInputElement;
    const newQuantity = parseInt(input.value, 10);

    if (!isNaN(newQuantity) && newQuantity >= 1) {
      void cartStore.updateItem(lineId, newQuantity);
    }
  }

  return {
    cartItems,
    itemCount,
    subTotal,
    checkOutUrl,
    isLoading,
    handleMoneyFormat,
    handleQuantityChange,
    removeItem: cartStore.removeItem,
    updateItem: cartStore.updateItem,
  };
}
