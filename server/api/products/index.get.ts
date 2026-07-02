import { createStorefrontFetch } from '@/services/storefront.service';
import { type H3Event, defineEventHandler } from 'h3';

const query = `
  query getProducts {
    products(first: 10) {
      edges {
        node {
          title
          id
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;
export default defineEventHandler(async (event: H3Event) => {
  const storeFrontFetch = createStorefrontFetch(event);
  return await storeFrontFetch('', {
    method: 'POST',
    body: JSON.stringify({ query }),
  });
});
