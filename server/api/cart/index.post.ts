import type { H3Event } from 'h3';
import { createCart } from '~~/server/services/shopify/cart.service';
import type { Cart } from '~~/types/Cart';

// create cart
export default defineEventHandler(async (event: H3Event): Promise<Cart> => {
  const body = await readBody<{
    lines?: {
      merchandiseId: string;
      quantity: number;
    }[];
  }>(event);

  return await createCart(event, body.lines ?? []);
});
