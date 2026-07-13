import type { MoneyV2 } from './Shopify';
import { ShopifyConnection } from './Shopify';

export interface ProductImage {
  url: string;
  altText: string | null;
}
export interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: MoneyV2;
}
export interface Product {
  id: string;
  title: string;
  description: string;
  handle?: string;
  featuredImage?: ProductImage | null;
  priceRange?: {
    minVariantPrice: MoneyV2;
  };
  variants?: {
    nodes: ProductVariant[];
  };
}

// payloads
interface ProductsPayload {
  products: ShopifyConnection<Product>;
}

interface ProductPayload {
  product: Product | null;
}
