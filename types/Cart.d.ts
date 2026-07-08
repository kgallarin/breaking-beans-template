import { MoneyV2 } from '~~/types/Shopify';

export interface CartLine {
  id: string;
  quantity: number;
  cost: {
    totalAmount: MoneyV2;
  };

  merchandise: {
    id: string;
    title: string;
    price: MoneyV2;
    product: {
      id: string;
      title: string;
      handle: string;
      featuredImage: {
        url: string;
        altText: string | null;
      } | null;
    };
  };
}

export interface CartCost {
  subtotalAmount: MoneyV2;
  totalAmount: MoneyV2;
  totalTaxAmount: MoneyV2 | null;
}

export interface Cart {
  id: string; // gid
  checkoutUrl: string;
  totalQuantity: number;
  cost: CartCost;
  lines: {
    nodes: CartLine[]; // pageable
  };
}

export interface CartUserError {
  field: string[] | null;
  message: string;
}
