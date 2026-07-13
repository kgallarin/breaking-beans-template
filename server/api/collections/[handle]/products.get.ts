import { type H3Event } from 'h3';
import { getCollectionProducts } from '~~/server/services/shopify/collections.service';

export default defineEventHandler(async (event: H3Event) => {
  const handle = getRouterParam(event, 'handle');
  const { first, after } = getQuery(event);

  if (!handle) {
    throw createError({
      status: 400,
      message: 'Handle is required.',
    });
  }
  return await getCollectionProducts(
    event,
    handle,
    Number(first) || 10,
    typeof after === 'string' ? after : undefined,
  );
});
