import { createMoneyV2 } from '@/tests/factories/money.v2.factory.ts';
import type { ProductVariant } from '@/types/Products';
import { faker } from '@faker-js/faker';
import { defu } from 'defu';

const productVariantSeeder = (): ProductVariant => {
  return {
    id: `gid://shopify/ProductVariant/${faker.number.int({ min: 1000000, max: 9999999 })}`,
    title: faker.commerce.productName(),
    availableForSale: faker.datatype.boolean({ probability: 0.5 }),
    price: createMoneyV2(),
  };
};

export const createProductVariant = (
  overrides?: Partial<ProductVariant>,
): ProductVariant => defu(overrides, productVariantSeeder());

export const createProductVariants = (
  quantity: number,
  overrides?: Partial<ProductVariant>,
): ProductVariant[] => {
  return Array.from({ length: quantity }, () => createProductVariant());
};
