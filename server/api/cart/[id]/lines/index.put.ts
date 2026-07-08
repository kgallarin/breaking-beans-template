import { cartLinesUpdate } from '#server/services/shopify/cart.service';
import type { H3Event } from 'h3';
import type { Cart } from '~~/types/Cart';

// update cart (line) items
export default defineEventHandler(async (event: H3Event): Promise<Cart> => {
  const { cartId, lines } = await readBody<{
    cartId: string;
    lines: {
      id: string;
      quantity: number;
    }[];
  }>(event);

  return await cartLinesUpdate(event, cartId, lines);
});
