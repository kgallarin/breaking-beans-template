import type { H3Event } from 'h3';
import { getCustomer } from '~~/server/services/shopify/customer.service';
import type { Customer } from '~~/types/Customer';

export default defineEventHandler(async (event: H3Event): Promise<Customer> => {
  const accessToken = getCookie(event, 'shopify_access_token');

  if (!accessToken) {
    throw createError({
      status: 401,
      message: 'Not Authenticated',
    });
  }

  return await getCustomer(event, accessToken);
});
