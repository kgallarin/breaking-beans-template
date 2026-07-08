import type { H3Event } from 'h3';
import { getCart } from '~~/server/services/shopify/cart.service';
import type { Cart } from '~~/types/Cart';

// show/get cart
export default defineEventHandler(async (event: H3Event): Promise<Cart> => {
  const cartId = getRouterParam(event, 'id');

  if (!cartId) {
    throw createError({
      status: 400,
      message: 'Cart ID is required',
    });
  }

  const cart = await getCart(event, cartId);

  if (!cart) {
    throw createError({
      status: 400,
      message: 'Cart not found or has expired',
    });
  }

  return cart;
});
