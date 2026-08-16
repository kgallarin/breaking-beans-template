import type { MoneyV2 } from '@/types/Shopify';
import { faker } from '@faker-js/faker';
import { defu } from 'defu';

const moneyV2Seeder = (): MoneyV2 => {
  return {
    amount: faker.finance.amount({ min: 10, max: 200, dec: 2 }).toString(),
    currencyCode: faker.finance.currencyCode(),
  };
};

export const createMoneyV2 = (overrides?: Partial<MoneyV2>) =>
  defu(overrides, moneyV2Seeder()) as MoneyV2;
