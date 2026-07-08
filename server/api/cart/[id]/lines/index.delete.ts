import { cartLinesRemove } from '#server/services/shopify/cart.service';
import type { H3Event } from 'h3';
import type { Cart } from '~~/types/Cart';

export default defineEventHandler(async (event: H3Event): Promise<Cart> => {
  const { cartId, lineIds } = await readBody<{
    cartId: string;
    lineIds: string[];
  }>(event);

  return await cartLinesRemove(event, cartId, lineIds);
});
