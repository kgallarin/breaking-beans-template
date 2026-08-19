import { createCollection } from '@/tests/factories/collection.factory.ts';
import type { Collection } from '@/types/Collection';
import collectionCard from '@app/components/collections/CollectionCard.vue';
import { renderSuspended } from '@nuxt/test-utils/runtime';
import '@testing-library/jest-dom/vitest';
import type { RenderResult } from '@testing-library/vue';
import { describe, expect, test } from 'vitest';

type RenderCollection<T = Record<string, unknown>> = {
  collection?: Partial<Collection>;
} & T;

const renderCollectionCard = async <T extends Record<string, unknown>>(
  props?: RenderCollection<T>,
): Promise<RenderResult> => {
  const { collection, ...extraProps } = props || {};

  return renderSuspended(collectionCard, {
    props: {
      collection: {
        ...createCollection(),
        ...collection,
      },
      ...extraProps,
    },
  });
};

describe('Collection Card Test Suite', (): void => {
  test('It mounts properly', async (): Promise<void> => {
    const { getByTestId } = await renderCollectionCard();

    expect(getByTestId('collection-card')).toBeInTheDocument();
  });
});
