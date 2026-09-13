import type { MoneyV2 } from '@/types/Shopify';
import { faker } from '@faker-js/faker';
import { defu } from 'defu';

const moneyV2Seeder = (templateType: boolean = false): MoneyV2 => {
  if (templateType) {
    return {
      amount: '0',
      currencyCode: 'PHP',
    };
  }
  return {
    amount: faker.finance.amount({ min: 10, max: 200, dec: 2 }).toString(),
    currencyCode: faker.finance.currencyCode(),
  };
};

export const createMoneyV2 = (
  overrides?: Partial<MoneyV2>,
  isTemplateType: boolean = false,
) => defu(overrides, moneyV2Seeder(isTemplateType)) as MoneyV2;
