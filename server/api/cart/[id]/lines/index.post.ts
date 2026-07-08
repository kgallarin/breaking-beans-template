import { H3Event } from 'h3';
import { cartLinesAdd } from '~~/server/services/shopify/cart.service';
import type { Cart } from '~~/types/Cart';

// add items to cart
export default defineEventHandler(async (event: H3Event): Promise<Cart> => {
  const cartId = getRouterParam(event, 'id')!;

  const { lines } = await readBody<{
    lines: {
      merchandiseId: string;
      quantity: number;
    }[];
  }>(event);

  return await cartLinesAdd(event, cartId, lines);
});
