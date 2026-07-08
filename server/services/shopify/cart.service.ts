import { createStorefrontFetch } from '#server/services/shopify/storefront.service';
import type { H3Event } from 'h3';
import type { Cart, CartUserError } from '~~/types/Cart';

const CART_FIELDS = `
  id
  checkoutUrl
  totalQuantity
  cost {
    subtotalAmount {
      amount
      currencyCode
    }
    totalAmount {
      amount
      currencyCode
    }
    totalTaxAmount {
      amount
      currencyCode
    }
  }
  lines(first: 100) {
    nodes {
      id
      quantity
      cost {
        totalAmount {
          amount
          currencyCode
        }
      }
      merchandise {
        ... on ProductVariant {
          id
          title
          price {
            amount
            currencyCode
          }
          product {
            id
            title
            handle
            featuredImage {
              url
              altText
            }
          }
        }
      }
    }
  }
`;

function cartErrors(userErrors: CartUserError[]): void {
  if (userErrors.length > 0) {
    throw createError({
      status: 400,
      message: userErrors[0]?.message || 'Cart error.',
    });
  }
}

async function createCart(
  event: H3Event,
  lines: {
    merchandiseId: string;
    quantity: number;
  }[] = [],
): Promise<Cart> {
  const fetch = createStorefrontFetch(event);

  const CREATE_CART_QUERY = `
    mutation createCart($input: CartInput!) {
      createCart(input: $input) {
        cart {
          ${CART_FIELDS}
          userErrors: {
            field
            message
          }
        }
      }
    }
  `;

  const res = await fetch<{
    data: {
      cartCreate: {
        cart: Cart;
        userErrors: CartUserError[];
      };
    };
  }>('', {
    method: 'POST',
    body: JSON.stringify({
      CREATE_CART_QUERY,
      variables: {
        input: {
          lines,
        },
      },
    }),
  });

  cartErrors(res.data.cartCreate.userErrors);

  return res.data.cartCreate.cart;
}

export async function getCart(event: H3Event, cartId: string): Promise<Cart | null> {
  const fetch = createStorefrontFetch(event);

  const GET_CART_QUERY = `
    query getCart($cartId: ID!) {
      cart(id: $cartId) {
        ${CART_FIELDS}
      }
    }
  `;

  const res = await fetch<{
    data: {
      cart: Cart | null;
    };
  }>('', {
    method: 'POST',
    body: JSON.stringify({
      GET_CART_QUERY,
      variables: {
        cartId,
      },
    }),
  });

  return res.data.cart;
}

export async function cartLinesAdd(
  event: H3Event,
  cartId: string,
  lines: {
    merchandiseId: string;
    quantity: number;
  }[],
): Promise<Cart> {
  const fetch = createStorefrontFetch(event);

  const ADD_CART_LINE_QUERY = `
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          ${CART_FIELDS}
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const res = await fetch<{
    data: {
      cartLinesAdd: {
        cart: Cart;
        userErrors: CartUserError[];
      };
    };
  }>('', {
    method: 'POST',
    body: JSON.stringify({
      query: ADD_CART_LINE_QUERY,
      variables: {
        cartId,
        lines,
      },
    }),
  });

  cartErrors(res.data.cartLinesAdd.userErrors);
  return res.data.cartLinesAdd.cart;
}

export async function cartLinesUpdate(
  event: H3Event,
  cartId: string,
  lines: {
    id: string;
    quantity: number;
  }[],
): Promise<Cart> {
  const fetch = createStorefrontFetch(event);

  const UPDATE_CART_LINES_QUERY = `
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          ${CART_FIELDS}
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const res = await fetch<{
    data: {
      cartLinesUpdate: {
        cart: Cart;
        userErrors: CartUserError[];
      };
    };
  }>('', {
    method: 'POST',
    body: JSON.stringify({
      query: UPDATE_CART_LINES_QUERY,
      variables: {
        cartId,
        lines,
      },
    }),
  });

  cartErrors(res.data.cartLinesUpdate.userErrors);
  return res.data.cartLinesUpdate.cart;
}

export async function cartLinesRemove(
  event: H3Event,
  cartId: string,
  lineIds: string[],
): Promise<Cart> {
  const fetch = createStorefrontFetch(event);

  const REMOVE_CART_LINES_QUERY = `
    mutation removeCartLines($cartId: ID!, $lineIds: [ID!]!) {
      removeCartlines(cartId: $cartId, lineIds: $lineIds) {
        cart {
          ${CART_FIELDS}
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const res = await fetch<{
    data: {
      cartLinesRemove: {
        cart: Cart;
        userErrors: CartUserError[];
      };
    };
  }>('', {
    method: 'POST',
    body: JSON.stringify({
      query: REMOVE_CART_LINES_QUERY,
      variables: {
        cartId,
        lineIds,
      },
    }),
  });

  cartErrors(res.data.cartLinesRemove.userErrors);
  return res.data.cartLinesRemove.cart;
}
