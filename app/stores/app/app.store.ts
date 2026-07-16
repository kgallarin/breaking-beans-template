export const useAppStore = defineStore('app', () => {
  const sidebarState = ref<boolean>(false);

  const isSidebarOpen = computed((): boolean => sidebarState.value);

  function openSidebar(): void {
    sidebarState.value = true;
  }

  function closeSidebar(): void {
    sidebarState.value = false;
  }

  return {
    isSidebarOpen,
    openSidebar,
    closeSidebar,
  };
});
