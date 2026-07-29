import { Product } from '@/types/Products';
import { faker } from '@faker-js/faker';
import { defu } from 'defu';

const productSeeder = (): Product => {
  const title = faker.commerce.productName();
  const handle = faker.helpers.slugify(title);

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
      minVariantPrice: {
        amount: faker.commerce.price({ min: 20, max: 300, dec: 2, symbol: '' }),
        currencyCode: faker.finance.currencyCode(),
      },
    },
    variants: {
      nodes: [
        {
          id: `gid://shopify/ProductVariant/${faker.number.int({ min: 1000000, max: 9999999 })}`,
          title: faker.commerce.productName(),
          availableForSale: faker.datatype.boolean({ probability: 0.5 }),
          price: {
            amount: faker.commerce.price({ min: 20, max: 300, dec: 2, symbol: '' }),
            currencyCode: faker.finance.currencyCode(),
          },
        },
      ],
    },
  };
};

export const createProduct = (overrides?: Partial<Product>): Product =>
  defu(overrides, productSeeder()) as Product;

export const createProducts = (
  quantity: number,
  overrides?: Partial<Product>,
): Product[] => {
  return Array.from({ length: quantity }, () => createProduct(overrides));
};
