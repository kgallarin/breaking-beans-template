export function useSidebar() {
  const isOpen = useState<boolean>('sidebar-state', () => true);
  function openSidebar() {
    console.log(1234);
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
    document.removeEventListener('keydown', handleKeyDown);
  });

  return {
    isOpen: readonly(isOpen),
    openSidebar,
    closeSidebar,
  };
}
