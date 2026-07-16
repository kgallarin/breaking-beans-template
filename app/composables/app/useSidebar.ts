interface SideBarConfig {
  title: string;
  description: string;
  onConfirm?: () => void | Promise<void>;
}

const config = ref<SideBarConfig | null>(null);
const isSidebarOpen = ref<boolean>(false);
const isSubmitting = ref<boolean>(false);

export function useSidebar() {
  function triggerSidebar(options: SideBarConfig): void {
    config.value = options;
    isSidebarOpen.value = true;
  }

  function closeSidebar(): void {
    if (isSubmitting.value) return;
    setTimeout((): void => {
      isSidebarOpen.value = false;
    }, 250);
  }

  async function executeConfirm(): Promise<void> {
    if (config.value?.onConfirm) {
      isSubmitting.value = true;
      await config.value.onConfirm();

      isSubmitting.value = false;
    }

    closeSidebar();
  }

  return {
    isSidebarOpen,
    config,
    isSubmitting,
    triggerSidebar,
    closeSidebar,
    executeConfirm,
  };
}
