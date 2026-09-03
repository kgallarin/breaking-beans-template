import { useAuthStore } from '~/stores/auth/auth.store';

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();

  if (!authStore.isLoggedIn) {
    await authStore.fetchCustomer();
  }

  if (!authStore.isLoggedIn) {
    return navigateTo('/auth/login');
  }
});
