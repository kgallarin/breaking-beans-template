<script setup lang="ts">
  import TheHeaderNav from '~/components/layout/TheHeaderNav.vue';
  // import CartView from '';
  import TheFooter from '~/components/layout/TheFooter.vue';

  import type { NavLink } from '~~/types/App';
  import { useCartStore } from '@store/cart/cart.store';

  import { useAuthStore } from '@store/auth/auth.store';
  import TheSidebarDrawer from '@components/layout/TheSidebarDrawer.vue';

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
      href: '',
      badgeValue: itemCount.value,
      action: true,
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
      case 'cart':
        handleCartClick();
        break;
      default:
        return navLabel;
    }
  }

  const CartView = defineAsyncComponent(
    () => import('@components/cart/CartView.vue'),
  );

  const { open } = useDrawer();
  function handleCartClick() {
    open(CartView, undefined, 'right');
  }
</script>
<template>
  <div data-testid="d-layout" class="flex h-full flex-col">
    <the-header-nav :nav-links="mainNavigations" @nav-item-click="handleNavAction" />
    <div class="md:px-4 lg:px-8">
      <slot />
    </div>
    <the-footer :nav-links="mainNavigations" />

    <base-drawer />
  </div>
</template>
