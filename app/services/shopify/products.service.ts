import type { H3Event } from 'h3';
import { createStorefrontFetch } from '~/services/shopify/storefront.service';
import type { Product } from '~~/types/Products';

const GET_PRODUCTS_QUERY = `
  query getProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          title
          id
          description
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

export async function getProducts(event: H3Event, first = 10): Promise<Product[]> {
  const storeFrontFetch = createStorefrontFetch(event);
  return await storeFrontFetch('', {
    method: 'POST',
    body: JSON.stringify({
      query: GET_PRODUCTS_QUERY,
      variables: first,
    }),
  });
}
