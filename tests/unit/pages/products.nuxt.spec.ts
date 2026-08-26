import { renderSuspended } from '@nuxt/test-utils/runtime';
import Products from '@pages/collections/[handle]/products.vue';
import type { RenderResult } from '@testing-library/vue';
import { describe, expect, test } from 'vitest';

const renderProductsPage = async (): Promise<RenderResult> => {
  return renderSuspended(Products, {});
};

describe(() => {
  test('', async () => {
    const { getByTestId } = await renderProductsPage();

    expect(getByTestId('load-more-products')).toBeInTheDocument();
  });
});
