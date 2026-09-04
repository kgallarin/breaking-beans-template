import type { Collection } from '@/types/Collection';
import { faker } from '@faker-js/faker';
import { defu } from 'defu';

const collectionSeeder = (): Collection => {
  const title = faker.commerce.productName();
  const handle = faker.helpers.slugify(title);

  return {
    id: `gid://shopify/Collection/${faker.number.int({ min: 100000, max: 999999 })}`,
    title,
    description: faker.commerce.productDescription(),
    handle,
    updatedAt: faker.date.recent().toDateString(),
  };
};

export const createCollection = (overrides?: Partial<Collection>): Collection =>
  defu(overrides, collectionSeeder()) as Collection;

export const createCollections = (
  quantity: number,
  overrides?: Partial<Collection>,
): Collection[] => {
  return Array.from({ length: quantity }, () => createCollection(overrides));
};
