export function useSidebar() {
  const isOpen = ref<boolean>(false);
  function openSidebar() {
    isOpen.value = true;
  }

  function closeSidebar() {
    isOpen.value = false;
  }

  // accessibility
  function handleKeyDown(event: KeyboardEvent) {
    if (isOpen.value && event.key === 'Escape') {
      closeSidebar();
    }
  }

  onMounted(() => {
    document.addEventListener('keydown', handleKeyDown);
  });

  onUnmounted(() => {
    document.addEventListener('keydown', handleKeyDown);
  });

  return {
    isOpen: readonly(isOpen),
    openSidebar,
    closeSidebar,
  };
}
