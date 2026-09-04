import type { Customer } from '@/types/Customer';
import { faker } from '@faker-js/faker';
import { defu } from 'defu';

const customerSeeder = (): Customer => {
  const customer = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.number({ style: 'human' }),
  };

  return {
    id: `gid://shopify/Customer/${faker.number.int({ min: 100000, max: 999999 })}`,
    firstName: customer.firstName,
    lastName: customer.lastName,
    emailAddress:
      faker.helpers.maybe(
        () => {
          return {
            emailAddress: customer.email,
          };
        },
        { probability: 0.8 },
      ) ?? null,
    phoneNumber:
      faker.helpers.maybe(
        () => ({
          phoneNumber: customer.phone,
        }),
        { probability: 0.8 },
      ) ?? null,
  };
};

export const createCustomer = (overrides?: Partial<Customer>): Customer =>
  defu(overrides, customerSeeder()) as Customer;

export const createCustomers = (
  quantity: number,
  overrides?: Partial<Customer>,
): Customer[] => {
  return Array.from({ length: quantity }, () => createCustomer(overrides));
};
