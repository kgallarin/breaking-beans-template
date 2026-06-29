import app from '@/app.vue';
import { renderSuspended } from '@nuxt/test-utils/runtime';
import '@testing-library/jest-dom';
import type { RenderResult } from '@testing-library/vue';
import { describe, expect, test } from 'vitest';

const renderAppRoot = async (): Promise<RenderResult> => {
  return renderSuspended(app, {
    global: {},
  });
};

describe('App root suite', (): void => {
  test('App container div mounts properly', async (): Promise<void> => {
    const { getByTestId } = await renderAppRoot();

    expect(getByTestId('app-root')).toBeInTheDocument();
  });
});
