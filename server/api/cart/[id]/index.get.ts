import type { H3Event } from 'h3';
import { getCart } from '~~/server/services/shopify/cart.service';
import type { Cart } from '~~/types/Cart';

// show/get cart
export default defineEventHandler(async (event: H3Event): Promise<Cart> => {
  const cartShortId = getRouterParam(event, 'id');

  const fullCartId = `gid://shopify/Cart/${cartShortId}`;

  if (!fullCartId) {
    throw createError({
      status: 400,
      message: 'Cart ID is required',
    });
  }

  const cart = await getCart(event, fullCartId);

  if (!cart) {
    throw createError({
      status: 400,
      message: 'Cart not found or has expired',
    });
  }

  return cart;
});
