import {
  type $Fetch,
  $fetch,
  type FetchContext,
  type FetchOptions,
  type ResponseType,
} from 'ofetch';

export function useApi(overrides: FetchOptions = {}): $Fetch {
  const config = useRuntimeConfig();
  // if server getCookie, if clients ignore
  const ssrHeaders = import.meta.server ? useRequestHeaders(['cookie']) : {};

  return $fetch.create({
    baseURL: import.meta.server ? `${config.public.appUrl}/api` : '/api',
    timeout: 15_000,

    onRequest<T>({ options }: FetchContext<T, ResponseType>): void {
      const headers = new Headers(options.headers as HeadersInit);

      if (import.meta.server && ssrHeaders.cookie) {
        headers.set('cookie', ssrHeaders.cookie);
      }

      options.headers = headers;
    },

    async onResponseError({ response }) {
      const error = response._data;

      switch (response.status) {
        case 401:
          throw createError({
            status: 401,
            message: error.data?.message ?? 'Unauthorized',
          });

        case 403:
          throw createError({
            status: 403,
            message: 'Not allowed',
          });

        case 422:
          throw createError({
            status: 422,
            message: error?.message || 'Validation error',
            data: error?.errors ?? error.data ?? {},
          });

        case 409:
          throw createError({
            status: 409,
            message: error?.message ?? 'Not allowed',
            data: error?.errors ?? error.data ?? {},
          });

        case 500:
          throw createError({
            status: 500,
            message: 'Internal server error',
          });
      }
    },

    ...overrides,
  });
}
