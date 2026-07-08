<script setup lang="ts">
  import type { NavLink } from '~~/types/App';
  import { useAuthStore } from '@store/auth/auth.store';

  const props = defineProps<{
    navLinks: NavLink[];
  }>();

  const authStore = useAuthStore();
  const { isLoggedIn } = storeToRefs(authStore);

  const computedNavLinks = computed(() => {
    return props.navLinks.filter((link: NavLink) => {
      if (link.auth && !isLoggedIn.value) return false; // needs loggedin but unauthenticated
      if (link.guest && isLoggedIn.value) return false; // if loggedin but only guest:logout
      return true;
    });
  });
</script>

<template>
  <footer class="mt-auto pt-20">
    <div class="footer-inner bg-blue-100 px-4 py-8">
      <nav class="create-base-nav-list flex gap-4">
        <NuxtLink
          v-for="nav in computedNavLinks"
          :key="nav.label"
          :to="nav.href"
          class="cursor-pointer"
        >
          {{ nav.label }}
        </NuxtLink>
      </nav>
    </div>
  </footer>
</template>
