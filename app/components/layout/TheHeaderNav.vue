<script setup lang="ts">
  import type { NavLink } from '~~/types/App';
  import { useAuthStore } from '@store/auth/auth.store';
  import { useAppStore } from '@store/app/app.store';

  const authStore = useAuthStore();
  // const { openSidebar } = useAppStore();
  const { triggerSidebar } = useSidebar();
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
  <div class="bg-white px-4 py-8">
    <div class="nav-inner flex justify-between">
      <div class="flex gap-4">
        <span @click.prevent.stop="triggerSidebar" class="cursor-pointer">
          <fa-icon :icon="['fas', 'bars']" class="text-xl" />
        </span>

        <NuxtLink to="/"> Breaking Beans </NuxtLink>
      </div>
      <nav class="create-base-nav-list flex gap-8" aria-label="header-nav">
        <template v-for="nav in computedNavLinks" :key="nav.label">
          <NuxtLink
            :to="nav.href"
            class="relative cursor-pointer"
            @click.prevent.stop="handleNavClick(nav)"
          >
            {{ nav.label }}

            <ClientOnly>
              <span
                v-if="nav.badgeValue"
                class="absolute -top-3 -right-4 inline-flex aspect-square w-fit min-w-5 items-center justify-center rounded-full bg-red-300 p-1 text-xs leading-none"
              >
                {{ nav.badgeValue }}
              </span>
            </ClientOnly>
          </NuxtLink>
        </template>
      </nav>
    </div>
  </div>
</template>
