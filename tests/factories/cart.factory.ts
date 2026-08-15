import { createCartLines } from '@/tests/factories/cartLine.factory.ts';
import { createMoneyV2 } from '@/tests/factories/moneyV2.factory.ts';
import type { Cart } from '@/types/Cart';
import { faker } from '@faker-js/faker';
import { defu } from 'defu';

const cartSeeder = (): Cart => {
  const cartHash = faker.string.alphanumeric({ length: 26, casing: 'upper' });

  return {
    id: `gid://shopify/Cart/c1-${cartHash}`,
    checkoutUrl: `https://${faker.internet.domainName()}/cart/c/${cartHash}`,
    totalQuantity: faker.number.int({ min: 1, max: 10 }),
    cost: {
      subtotalAmount: createMoneyV2(),
      totalAmount: createMoneyV2(),
      totalTaxAmount: createMoneyV2(),
    },
    lines: {
      nodes: createCartLines(4),
    },
  };
};

export const createCart = (overrides?: Partial<Cart>): Cart =>
  defu(overrides, cartSeeder()) as Cart;
