import type { DeepPartial } from '#app/config';
import { createMoneyV2 } from '@/tests/factories/money.v2.factory.ts';
import { createProduct } from '@/tests/factories/product.factory.ts';
import type { CartLine } from '@/types/Cart';
import { faker } from '@faker-js/faker';
import { defu } from 'defu';

// deep override

export const cartLineSeeder = (templateType: boolean = false): CartLine => {
  const cartLineId = `gid://shopify/CartLine/${faker.string.alphanumeric({ length: 26, casing: 'upper' })}`;

  if (templateType) {
    return {
      id: '',
      quantity: 1,
      cost: {
        totalAmount: createMoneyV2({}, true), // template seeder
      },

      merchandise: {
        id: '',
        title: '',
        price: createMoneyV2({}, true),
        product: createProduct({}, true),
      },
    };
  }
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

export const createCartLine = (
  overrides?: DeepPartial<CartLine>,
  isTemplateType: boolean = false,
): CartLine => defu(overrides, cartLineSeeder(isTemplateType)) as CartLine;

export const createCartLines = (
  quantity: number,
  overrides?: DeepPartial<CartLine>,
  isTemplateType: boolean = false,
): CartLine[] => {
  return Array.from({ length: quantity }, () =>
    createCartLine(overrides, isTemplateType),
  );
};
