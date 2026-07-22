import { onClickOutside } from '@vueuse/core';

export function useSidebar() {
  const isOpen = useState<boolean>('sidebar-state', () => false);
  const sidebar = ref<HTMLDivElement | null>(null);
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

  // clicking outside
  onClickOutside(sidebar, () => {
    closeSidebar();
  });

  onMounted(() => {
    document.addEventListener('keydown', handleKeyDown);
  });

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeyDown);

    closeSidebar();
  });

  return {
    isOpen: readonly(isOpen),
    openSidebar,
    closeSidebar,
    sidebar,
  };
}
