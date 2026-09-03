import { useCartStore } from '@store/cart/cart.store.ts';

export function useCart() {
  const cartStore = useCartStore();
  const { updateItem, removeItem } = cartStore;
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
    if (!money) return '';

    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: money.currencyCode,
    }).format(parseFloat(money.amount));
  }

  function handleQuantityChange(lineId: string, event: Event): void {
    const input = event.target as HTMLInputElement;
    const newQuantity = parseInt(input.value, 10);

    if (!isNaN(newQuantity) && newQuantity >= 1) {
      void updateItem(lineId, newQuantity);
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
    removeItem,
    updateItem,
  };
}
