import { type H3Event } from 'h3';
import { getCollections } from '~~/server/services/shopify/collections.service';

export default defineEventHandler(async (event: H3Event) => {
  const { first } = getQuery(event);
  return await getCollections(event, Number(first) || 10);
});
