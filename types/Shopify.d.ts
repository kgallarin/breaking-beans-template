export interface ShopifyApiError {
  message: string;
  locations?: {
    line: number;
    column: number;
  }[];
  path?: string[];
  extensions?: Record<string, unknown>;
}

export interface ShopifyApiResponse<T> {
  data: T;
  errors?: ShopifyApiError[];
  extensions?: Record<string, unknown>;
}

// lists
export interface ShopifyPageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor?: string;
  endCursor?: string;
}

export interface ShopifyEdge<T> {
  cursor: string;
  node: T;
}

export interface ShopifyConnection<T> {
  edges?: ShopifyEdge<T>[];
  pageInfo: ShopifyPageInfo;
  // for new versions directly queueing nodes
  nodes?: T[];
}

export interface MoneyV2 {
  amount: string;
  currencyCode: string;
}

export interface ShopifyOAuthError {
  error: string;
  error_description: string;
}
