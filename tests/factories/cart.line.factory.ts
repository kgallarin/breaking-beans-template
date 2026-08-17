import { createMoneyV2 } from '@/tests/factories/money.v2.factory.ts';
import { createProduct } from '@/tests/factories/product.factory.ts';
import type { CartLine } from '@/types/Cart';
import { faker } from '@faker-js/faker';
import { defu } from 'defu';

const cartLineSeeder = (): CartLine => {
  const cartLineId = `gid://shopify/CartLine/${faker.string.alphanumeric({ length: 26, casing: 'upper' })}`;

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
      product: createProduct(),
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
