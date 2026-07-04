import { H3Event } from 'h3';
import { getProduct } from '~~/server/services/shopify/products.service';

export default defineEventHandler(async (event: H3Event) => {
  const handle = getRouterParam(event, 'handle');

  if (!handle) {
    throw createError({
      status: 400,
      message: 'Handle is required.',
    });
  }

  return await getProduct(event, handle);
});
