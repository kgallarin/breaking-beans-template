import type { DeepPartial } from '#app/config';
import { createMoneyV2 } from '@/tests/factories/money.v2.factory.ts';
import { createProductVariants } from '@/tests/factories/product.variant.factory.ts';
import type { Product } from '@/types/Products';
import { faker } from '@faker-js/faker';
import { defu } from 'defu';

const productSeeder = (isTemplateType: boolean = false): Product => {
  const title = faker.commerce.productName();
  const handle = faker.helpers.slugify(title);

  if (isTemplateType) {
    return {
      id: '',
      title: '',
      handle: '',
      description: '',
      featuredImage: {
        url: '',
        altText: '',
      },
      priceRange: {
        minVariantPrice: createMoneyV2({}, true),
      },
      variants: {
        nodes: createProductVariants(3),
      },
    };
  }

  return {
    id: `gid://shopify/Product/${faker.number.int({ min: 100000, max: 999999 })}`,
    title,
    handle,
    description: faker.commerce.productDescription(),
    featuredImage: {
      url: faker.image.url({ width: 200, height: 200 }),
      altText: faker.commerce.productMaterial(),
    },
    priceRange: {
      minVariantPrice: createMoneyV2(),
    },
    variants: {
      nodes: createProductVariants(3),
    },
  };
};

export const createProduct = (
  overrides?: DeepPartial<Product>,
  isTemplateType: boolean = false,
): Product => defu(overrides, productSeeder(isTemplateType)) as Product;

export const createProducts = (
  quantity: number,
  overrides?: DeepPartial<Product>,
  isTemplateType: boolean = false,
): Product[] => {
  return Array.from({ length: quantity }, () =>
    createProduct(overrides, isTemplateType),
  );
};
