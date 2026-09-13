import { createMoneyV2 } from '@/tests/factories/money.v2.factory.ts';
import type { DeepPartial } from '@/types/App';
import type { ProductVariant } from '@/types/Products';
import { faker } from '@faker-js/faker';
import { defu } from 'defu';

const productVariantSeeder = (isTemplateType: boolean): ProductVariant => {
  if (isTemplateType) {
    return {
      id: '',
      title: '',
      availableForSale: true,
      price: createMoneyV2({}, true),
    };
  }
  return {
    id: `gid://shopify/ProductVariant/${faker.number.int({ min: 1000000, max: 9999999 })}`,
    title: faker.commerce.productName(),
    availableForSale: faker.datatype.boolean({ probability: 0.5 }),
    price: createMoneyV2(),
  };
};

export const createProductVariant = (
  overrides?: DeepPartial<ProductVariant>,
  isTemplateType: boolean = false,
): ProductVariant => defu(overrides, productVariantSeeder(isTemplateType));

export const createProductVariants = (
  quantity: number,
  overrides?: DeepPartial<ProductVariant>,
  isTemplateType: boolean = false,
): ProductVariant[] => {
  return Array.from({ length: quantity }, (): ProductVariant =>
    createProductVariant(overrides, isTemplateType),
  );
};
