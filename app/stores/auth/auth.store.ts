import { defineStore } from 'pinia';
import type { Customer } from '~~/types/Customer';

export const useAuthStore = defineStore('auth', () => {
  // state
  const customer = ref<Customer | null>(null);

  // getters
  const isLoggedIn = computed(() => !!customer.value);

  // actions
  async function fetchCustomer(): Promise<void> {
    try {
      // customer.value = await $fetch<Customer>('/api/auth/me');
      const fetchWithHeaders = useRequestFetch();
      customer.value = await fetchWithHeaders('/api/auth/me');
    } catch {
      // not logged in or expired token
      customer.value = null;
    }
  }

  async function logout(): Promise<void> {
    await $fetch('/api/auth/logout', { method: 'POST' });

    customer.value = null;

    await navigateTo('/', { replace: true });
  }

  return {
    customer,
    isLoggedIn,
    fetchCustomer,
    logout,
  };
});
