import { renderSuspended } from '@nuxt/test-utils/runtime';
import type { RenderOptions } from '@testing-library/vue';
import { getActivePinia, piniaSymbol } from 'pinia';

export const renderAndInitializeStore = async <T extends Component>(
  component: T,
  options: RenderOptions<T> = {},
) => {
  const pinia = getActivePinia();
  return renderSuspended(component, {
    global: {
      ...options?.global,
      provide: {
        ...(pinia ? { [piniaSymbol as symbol]: pinia } : {}),
        ...options?.global?.provide,
      },
    },
    ...options,
  });
};
