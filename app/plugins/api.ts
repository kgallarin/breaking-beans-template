import { type $Fetch } from 'ofetch';
import { createApiFetch } from '~/services/http';

export default defineNuxtPlugin((): { provide: { api: $Fetch } } => {
  const api = createApiFetch();

  return {
    provide: {
      api,
    },
  };
});
