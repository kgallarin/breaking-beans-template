<script setup lang="ts">
  import TheHeaderNav from '~/components/layout/TheHeaderNav.vue';
  import TheFooter from '~/components/layout/TheFooter.vue';
  import type { NavLink } from '~~/types/App';
  import { useCartStore } from '@store/cart/cart.store';

  import { useAuthStore } from '@store/auth/auth.store';

  const cartStore = useCartStore();
  const { itemCount } = storeToRefs(cartStore);

  const authStore = useAuthStore();
  const { customer } = storeToRefs(authStore);

  const mainNavigations = computed((): NavLink[] => [
    {
      label: 'home',
      href: '/',
    },
    {
      label: 'products',
      href: '/products',
    },
    {
      label: 'collections',
      href: '/collections',
    },
    {
      label: 'cart',
      href: '/cart',
      badgeValue: itemCount.value,
    },
    {
      label: 'login',
      href: '/auth/login',
      guest: true,
    },
    {
      label: `Hello ${customer?.value?.firstName}`,
      href: '/account',
      auth: true,
    },
    {
      label: 'logout',
      href: '',
      auth: true,
      action: true,
    },
  ]);

  async function handleNavAction(navLabel: string) {
    switch (navLabel) {
      case 'logout':
        await authStore.logout();
        break;

      default:
        return navLabel;
    }
  }
</script>
<template>
  <div data-testid="d-layout" class="flex h-full flex-col">
    <the-header-nav :nav-links="mainNavigations" @nav-item-click="handleNavAction" />
    <slot />
    <the-footer :nav-links="mainNavigations" />
  </div>
</template>
