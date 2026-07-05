import { useAuthStore } from '~/stores/auth/auth.store';

export default defineNuxtRouteMiddleware(() => {
  const { isLoggedIn } = useAuthStore();

  if (isLoggedIn) {
    return navigateTo('/account');
  }
});
