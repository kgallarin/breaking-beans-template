import { type Component } from 'vue';

import type { ComponentProps } from '#build/types/layouts';

export type DrawerDirection = 'left' | 'right' | 'down';

const isDrawerOpen = ref(false);
const activeComponent = shallowRef<Component | null>(null);
const componentProps = ref<Record<string, unknown>>({});
const drawerDirection = ref<DrawerDirection>('down');

export function useDrawer() {
  function open<T extends Component>(
    component: T,
    ...args: {} extends ComponentProps<T>
      ? [props?: ComponentProps<T>, direction?: DrawerDirection]
      : [props: ComponentProps<T>, direction?: DrawerDirection]
  ) {
    const [props, direction = 'down'] = args;

    activeComponent.value = component;
    componentProps.value = (props as Record<string, unknown>) || {};
    drawerDirection.value = direction;
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
    activeComponent: readonly(activeComponent),
    componentProps: readonly(componentProps),
    direction: readonly(drawerDirection),
    open,
    closeDrawer,
  };
}
