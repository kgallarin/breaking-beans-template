import { type $Fetch } from 'ofetch';

export default defineNuxtPlugin((): { provide: { api: $Fetch } } => {
  const api = useApi();

  return {
    provide: {
      api,
    },
  };
});
