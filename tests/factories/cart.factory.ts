import { createCartLines } from '@/tests/factories/cart-line.factory.ts';
import type { Cart } from '@/types/Cart';
import { faker } from '@faker-js/faker';
import { defu } from 'defu';

const cartSeeder = (): Cart => {
  const cartHash = faker.string.alphanumeric({ length: 26, casing: 'upper' });
  const fakerMoneyV2 = {
    amount: faker.finance.amount({ min: 10, max: 200, dec: 2 }).toString(),
    currencyCode: faker.finance.currencyCode(),
  };

  return {
    id: `gid://shopify/Cart/c1-${cartHash}`,
    checkoutUrl: `https://${faker.internet.domainName()}/cart/c/${cartHash}`,
    totalQuantity: faker.number.int({ min: 1, max: 10 }),
    cost: {
      subtotalAmount: fakerMoneyV2,
      totalAmount: fakerMoneyV2,
      totalTaxAmount: fakerMoneyV2,
    },
    lines: {
      nodes: createCartLines(4),
    },
  };
};

export const createCart = (overrides?: Partial<Cart>): Cart =>
  defu(overrides, cartSeeder()) as Cart;
