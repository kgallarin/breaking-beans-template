import { type H3Event } from 'h3';
import { getCollections } from '~/services/shopify/collections.service';

export default defineEventHandler(
  async (event: H3Event) => await getCollections(event),
);
