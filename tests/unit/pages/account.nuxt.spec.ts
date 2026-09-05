import { setupAuthTestStore } from '@/tests/unit/support/auth.store.support.ts';
import { renderAndInitializeStore } from '@/tests/unit/support/render.support.ts';
import '@testing-library/jest-dom';
import { beforeEach, describe, expect, test } from 'vitest';
import AccountPage from '~/pages/account/index.vue';

const renderAccountPage = (options = {}) =>
  renderAndInitializeStore(AccountPage, options);

describe('Account Page - Unit Test Suite', (): void => {
  describe('Authenticated User', (): void => {
    beforeEach(() => {
      setupAuthTestStore({
        stubActions: true,
        customer: { firstName: 'John' },
      });
    });

    test('Fetches and renders user details via useFetch', async (): Promise<void> => {
      const { getByTestId } = await renderAccountPage({
        props: {},
      });
      const accountWrapper = getByTestId('account-wrapper');

      expect(accountWrapper).toBeInTheDocument();
      expect(accountWrapper).toHaveTextContent('John');
    });
  });
});
