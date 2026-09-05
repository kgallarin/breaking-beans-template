import { createProduct } from '@/tests/factories/product.factory.ts';
import type { Product } from '@/types/Products';
import productCard from '@app/components/products/ProductCard.vue';
import { renderSuspended } from '@nuxt/test-utils/runtime';
import '@testing-library/jest-dom/vitest';
import type { RenderResult } from '@testing-library/vue';
import { describe, expect, test } from 'vitest';

type RenderProduct<T = Record<string, unknown>> = {
  product?: Partial<Product>;
} & T;
const renderProductCard = async <T extends Record<string, unknown>>(
  props?: RenderProduct<T>,
): Promise<RenderResult> => {
  const { product, ...extraProps } = props || {};

  return renderSuspended(productCard, {
    props: {
      product: {
        ...createProduct(),
        ...product,
      },
      ...extraProps,
    },
  });
};

describe('Component:Product Card - Unit Test Suite', (): void => {
  test('It mounts properly', async (): Promise<void> => {
    const { getByTestId } = await renderProductCard();

    expect(getByTestId('product-card')).toBeInTheDocument();
  });

  test('It has correct title and amount with given props', async (): Promise<void> => {
    const { getByTestId } = await renderProductCard({
      product: {
        title: 'Baby Clothing',
      },
    });

    expect(getByTestId('product-card')).toHaveTextContent('Baby Clothing');
  });

  test('It has correct formatted starting price', async (): Promise<void> => {
    const testAmount = {
      amount: '300.0',
      currencyCode: 'PHP',
    };
    const { getByTestId } = await renderProductCard({
      product: {
        priceRange: {
          minVariantPrice: testAmount,
        },
      },
    });

    expect(getByTestId('product-card')).toHaveTextContent(
      Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: testAmount.currencyCode,
      }).format(parseFloat(testAmount.amount)),
    );
  });
});
