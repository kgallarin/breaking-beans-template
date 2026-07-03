import type { H3Event } from 'h3';
import { createStorefrontFetch } from '~/services/shopify/storefront.service';

const COLLECTIONS_QUERY = `
  query Collections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          title
          handle
          updatedAt
        }
      }
    }
  }
`;

const COLLECTION_PRODUCTS_QUERY = `
    query CollectionProducts($handle: String!, $first: Int!) {
      collection(handle: $handle) {
        title
        products(first: $first) {
          nodes {
            id
            title
            handle
            featuredImage {
              url
              altText
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

export async function getCollectionProducts(
  event: H3Event,
  handle: string,
  first = 10,
) {
  const storeFrontFetch = createStorefrontFetch(event);
  return await storeFrontFetch('', {
    method: 'POST',
    body: JSON.stringify({
      query: COLLECTION_PRODUCTS_QUERY,
      variables: first,
    }),
  });
}

export async function getCollections(event: H3Event, first = 10) {
  const storeFrontFetch = createStorefrontFetch(event);
  return await storeFrontFetch('', {
    method: 'POST',
    body: JSON.stringify({
      query: COLLECTIONS_QUERY,
      variables: first,
    }),
  });
}
