import { renderSuspended } from '@nuxt/test-utils/runtime';
import home from '@pages/index.vue';
import '@testing-library/jest-dom';
import type { RenderResult } from '@testing-library/vue';
import { describe, expect, test } from 'vitest';

const renderHomePage = async (): Promise<RenderResult> => {
  return renderSuspended(home, {
    global: {},
  });
};

describe('Homepage Test Suite', (): void => {
  test('Homepage container mounts properly', async (): Promise<void> => {
    const { getByTestId } = await renderHomePage();

    expect(getByTestId('home-page')).toBeInTheDocument();
  });
});
