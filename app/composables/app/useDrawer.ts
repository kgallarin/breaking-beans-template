import { type Component, markRaw } from 'vue';

import type { ComponentProps } from '#build/types/layouts';

export type DrawerDirection = 'left' | 'right' | 'down';

const isDrawerOpen = ref(false);
const activeComponent = shallowRef<Component | null>(null);
const componentProps = ref<Record<string, unknown>>({});
const drawerDirection = ref<DrawerDirection>('down');
const drawerTitle = ref<string>('Default Drawer Title');

export function useDrawer() {
  function open<T extends Component>(
    component: T,
    ...args: {} extends ComponentProps<T>
      ? [props?: ComponentProps<T>, direction?: DrawerDirection, title?: string]
      : [props: ComponentProps<T>, direction?: DrawerDirection, title?: string]
  ) {
    const [props, direction = 'down', title = 'Default Drawer Title'] = args;

    activeComponent.value = markRaw(component);
    componentProps.value = (props as Record<string, unknown>) || {};
    drawerDirection.value = direction;
    drawerTitle.value = title;

    isDrawerOpen.value = true;
  }
  function closeDrawer(): void {
    isDrawerOpen.value = false;
    setTimeout((): void => {
      activeComponent.value = null;
    }, 450);
  }

  return {
    isOpen: readonly(isDrawerOpen),
    title: readonly(drawerTitle),
    activeComponent: readonly(activeComponent),
    componentProps: readonly(componentProps),
    direction: readonly(drawerDirection),
    open,
    closeDrawer,
  };
}
