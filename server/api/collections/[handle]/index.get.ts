import { getCollectionByHandle } from '#server/services/shopify/collections.service';
import type { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  const handle = getRouterParam(event, 'handle');
  const { first } = getQuery(event);

  if (!handle) {
    throw createError({
      status: 400,
      message: 'Handle is required.',
    });
  }
  return await getCollectionByHandle(event, handle, Number(first) || 10);
});
