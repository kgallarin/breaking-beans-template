import { type H3Event } from 'h3';
import { getCollections } from '~~/server/services/shopify/collections.service';
import type { CollectionsPayload } from '~~/types/Collection';
import type { ShopifyApiResponse } from '~~/types/Shopify';

export default defineEventHandler(
  async (event: H3Event): Promise<ShopifyApiResponse<CollectionsPayload>> => {
    const { first } = getQuery(event);
    return await getCollections(event, Number(first) || 10);
  },
);
