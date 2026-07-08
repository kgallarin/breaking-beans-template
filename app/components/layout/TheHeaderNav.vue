<script setup lang="ts">
  import type { NavLink } from '~~/types/App';
  import { useAuthStore } from '@store/auth/auth.store';

  const authStore = useAuthStore();
  const { isLoggedIn } = storeToRefs(authStore);

  const props = defineProps<{
    navLinks: NavLink[];
  }>();

  const emit = defineEmits<{
    navItemClick: [itemLabel: string];
  }>();

  const computedNavLinks = computed(() => {
    return props.navLinks.filter((link: NavLink) => {
      if (link.auth && !isLoggedIn.value) return false; // needs loggedin but unauthenticated
      if (link.guest && isLoggedIn.value) return false; // if loggedin but only guest:logout
      return true;
    });
  });

  function handleNavClick(nav: NavLink) {
    if (!nav.action) return;

    emit('navItemClick', nav.label.toLowerCase());
  }
</script>

<template>
  <div class="bg-green-200 px-4 py-8">
    <div class="nav-inner flex justify-between">
      <NuxtLink to="/"> Breaking Beans </NuxtLink>
      <nav class="create-base-nav-list flex gap-8">
        <template v-for="nav in computedNavLinks" :key="nav.label">
          <NuxtLink
            :to="nav.href"
            class="relative cursor-pointer"
            @click.prevent.stop="handleNavClick(nav)"
          >
            {{ nav.label }}

            <span
              v-if="nav.badgeValue"
              class="absolute -top-3 -right-4 inline-flex aspect-square w-fit min-w-5 items-center justify-center rounded-full bg-red-300 p-1 text-xs leading-none"
            >
              {{ nav.badgeValue }}
            </span>
          </NuxtLink>
        </template>
      </nav>
    </div>
  </div>
</template>
