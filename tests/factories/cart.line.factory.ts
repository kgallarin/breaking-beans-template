import { createMoneyV2 } from '@/tests/factories/money.v2.factory.ts';
import type { CartLine } from '@/types/Cart';
import { faker } from '@faker-js/faker';
import { defu } from 'defu';

const cartLineSeeder = (): CartLine => {
  const cartLineId = `gid://shopify/CartLine/${faker.string.alphanumeric({ length: 26, casing: 'upper' })}`;

  const productTitle = faker.commerce.productName();
  const productHandle = faker.helpers.slugify(productTitle);

  return {
    id: cartLineId,
    quantity: faker.number.int({ min: 1, max: 5 }),
    cost: {
      totalAmount: createMoneyV2(),
    },

    merchandise: {
      id: `gid://shopify/ProductVariant/${faker.number.int({ min: 100000, max: 999999 })}`,
      title: faker.commerce.productName(),
      price: createMoneyV2(),
      product: {
        id: `gid://shopify/Product/${faker.number.int({ min: 100000, max: 999999 })}`,
        title: productTitle,
        handle: productHandle,
        featuredImage: {
          url: faker.image.url({ width: 200, height: 200 }),
          altText: faker.commerce.productMaterial(),
        },
      },
    },
  };
};

export const createCartLine = (overrides?: Partial<CartLine>): CartLine =>
  defu(overrides, cartLineSeeder()) as CartLine;

export const createCartLines = (
  quantity: number,
  overrides?: Partial<CartLine>,
): CartLine[] => {
  return Array.from({ length: quantity }, () => createCartLine(overrides));
};
