import { type H3Event, defineEventHandler } from 'h3';
import Redis from 'ioredis';
import { getProducts } from '~~/server/services/shopify/products.service';
import type { ProductsPayload } from '~~/types/Products';
import type { ShopifyApiResponse } from '~~/types/Shopify';

const redis = new Redis({
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: Number(process.env.REDIS_PORT) || 6379,
});
export default defineEventHandler(
  async (event: H3Event): Promise<ShopifyApiResponse<ProductsPayload>> => {
    const { first, after } = getQuery(event);
    const productsCacheKey = `products:first:${first || 10}:after:${after || 'none'}`;

    const cachedData = await redis.get(productsCacheKey);

    if (cachedData) {
      setHeader(event, 'X-Cache', 'CACHE-HIT');
      setHeader(event, 'X-Cache-Provider', 'Redis');
      return JSON.parse(cachedData);
    }

    const products = await getProducts(
      event,
      Number(first) || 10,
      typeof after === 'string' ? after : undefined,
    );

    setHeader(event, 'X-Cache', 'CACHE-MISS');

    // 60s expiration
    await redis.set(productsCacheKey, JSON.stringify(products), 'EX', 3600);

    return products;
  },
);
