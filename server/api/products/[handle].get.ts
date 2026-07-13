import { H3Event } from 'h3';
import { getProduct } from '~~/server/services/shopify/products.service';
import type { ProductPayload } from '~~/types/Products';
import type { ShopifyApiResponse } from '~~/types/Shopify';

export default defineEventHandler(
  async (event: H3Event): Promise<ShopifyApiResponse<ProductPayload>> => {
    const handle = getRouterParam(event, 'handle');

    if (!handle) {
      throw createError({
        status: 400,
        message: 'Handle is required.',
      });
    }

    return await getProduct(event, handle);
  },
);
