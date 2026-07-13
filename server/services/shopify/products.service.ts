import type { H3Event } from 'h3';
import { createStorefrontFetch } from '~~/server/services/shopify/storefront.service';
import type { ProductPayload, ProductsPayload } from '~~/types/Products';
import type { ShopifyApiResponse } from '~~/types/Shopify';

const GET_PRODUCTS_QUERY = `
  query getProducts($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      edges {
        node {
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
          variants(first: 10) {
            nodes {
              id
              title
              availableForSale
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
      }
    }
  }
`;

const GET_PRODUCT_QUERY = `
  query getProduct($handle: String!) {
    product(handle: $handle) {
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
      variants(first: 10) {
        nodes {
          id
          title
          availableForSale
          price {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;

export async function getProducts(
  event: H3Event,
  first = 10,
  after?: string,
): Promise<ShopifyApiResponse<ProductsPayload>> {
  const storeFrontFetch = createStorefrontFetch(event);
  return await storeFrontFetch('', {
    method: 'POST',
    body: JSON.stringify({
      query: GET_PRODUCTS_QUERY,
      variables: { first, after },
    }),
  });
}

export async function getProduct(
  event: H3Event,
  handle: string,
): Promise<ShopifyApiResponse<ProductPayload>> {
  const storeFrontFetch = createStorefrontFetch(event);

  return await storeFrontFetch('', {
    method: 'POST',
    body: JSON.stringify({
      query: GET_PRODUCT_QUERY,
      variables: { handle },
    }),
  });
}
