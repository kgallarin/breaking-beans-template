import defaultLayout from '@/layouts/default.vue';
import { renderSuspended } from '@nuxt/test-utils/runtime';
import '@testing-library/jest-dom';
import type { RenderResult } from '@testing-library/vue';
import { describe, expect, test } from 'vitest';

const renderLayoutDefault = async (): Promise<RenderResult> => {
  return renderSuspended(defaultLayout, {
    slots: {
      default: '<div>Child Slot</div>',
    },
  });
};

describe('Default layout test suite', (): void => {
  test('Default layout mounts properly', async (): Promise<void> => {
    const { getByTestId } = await renderLayoutDefault();

    expect(getByTestId('d-layout')).toBeInTheDocument();
  });
  test('Default layout mounts with correct text from child slot', async (): Promise<void> => {
    const { getByText } = await renderLayoutDefault();

    expect(getByText('Child Slot')).toBeInTheDocument();
  });
});
