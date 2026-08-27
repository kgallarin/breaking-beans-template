import { Product } from '@/types/Products';
import { ShopifyConnection } from '~~/types/Shopify';

export interface Collection {
  id: string;
  title: string;
  description: string;
  handle: string;
  updatedAt: string;
}

// payloads
export interface CollectionsPayload {
  collections: ShopifyConnection<Collection>;
}

export interface CollectionPayload {
  collection: Collection | null;
}

export interface CollectionProductsPayload {
  collection: {
    products: ShopifyConnection<Product>;
  };
}
