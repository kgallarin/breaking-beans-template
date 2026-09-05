import { createCustomer } from '@/tests/factories/customer.factory.ts';
import type { Customer } from '@/types/Customer';
import { createTestingPinia } from '@pinia/testing';
import { useAuthStore } from '@store/auth/auth.store.ts';
import { setActivePinia } from 'pinia';
import { vi } from 'vitest';

export interface SetupAuthStoreOptions {
  stubActions?: boolean;
  customer?: Partial<Customer> | null;
  initialState?: Partial<ReturnType<typeof useAuthStore>['$state']>;
}

/**
 * @param options.stubActions - set "true" to disable API calls, "false" for endpoint fetch (registerEndpoint)
 * @param options.customer - Customer overrides, null:guest
 */
export const setupAuthTestStore = (options: SetupAuthStoreOptions = {}) => {
  const { stubActions = false, customer = {}, initialState = {} } = options;

  const initialCustomerState = customer === null ? null : createCustomer(customer);

  const pinia = createTestingPinia({
    stubActions,
    createSpy: vi.fn,
    initialState: {
      auth: {
        customer: initialCustomerState,
        ...initialState,
      },
    },
  });

  setActivePinia(pinia);

  return {
    pinia,
    authStore: useAuthStore(pinia),
  };
};
