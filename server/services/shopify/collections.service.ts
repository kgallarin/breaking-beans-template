import type { H3Event } from 'h3';
import { createStorefrontFetch } from '~~/server/services/shopify/storefront.service';
import type { ShopifyApiResponse } from '~~/types/Shopify';

const COLLECTIONS_QUERY = `
  query getCollections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          title
          description
          handle
          updatedAt
        }
      }
    }
  }
`;

const COLLECTION_PRODUCTS_QUERY = `
    query getCollectionProducts($handle: String!, $first: Int!) {
      collection(handle: $handle) {
        title
        products(first: $first) {
          nodes {
            id
            title
            description
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

export async function getCollectionByHandle(
  event: H3Event,
  handle: string,
  first: number,
): Promise<
  ShopifyApiResponse<{
    collection: Collection | null;
  }>
> {
  const COLLECTION_QUERY = `
    query getCollectionByHandle($handle: String!, $first: Int!) {
      collection(handle: $handle) {
        id
        title
        description
        products(first: $first) {
          nodes {
            id
            title
            description
          }
        }
      }
    }
  `;
  const storeFrontFetch = createStorefrontFetch(event);
  return await storeFrontFetch('', {
    method: 'POST',
    body: JSON.stringify({
      query: COLLECTION_QUERY,
      variables: { handle, first },
    }),
  });
}

export async function getCollections(
  event: H3Event,
  first = 10,
): Promise<Collection[]> {
  const storeFrontFetch = createStorefrontFetch(event);
  return await storeFrontFetch('', {
    method: 'POST',
    body: JSON.stringify({
      query: COLLECTIONS_QUERY,
      variables: { first },
    }),
  });
}

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
      variables: { handle, first },
    }),
  });
}
