import { type H3Event, defineEventHandler } from 'h3';
import { getProducts } from '~~/server/services/shopify/products.service';
import type { ProductsPayload } from '~~/types/Products';
import type { ShopifyApiResponse } from '~~/types/Shopify';

export default defineEventHandler(
  async (event: H3Event): Promise<ShopifyApiResponse<ProductsPayload>> => {
    const { first, after } = getQuery(event);
    return await getProducts(
      event,
      Number(first) || 10,
      typeof after === 'string' ? after : undefined,
    );
  },
);
