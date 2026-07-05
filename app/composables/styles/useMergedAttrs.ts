import type { ClassValue } from 'clsx';

export function useMergedAttrs(defaultStyles: MaybeRefOrGetter<ClassValue>) {
  const attrs = useAttrs();

  return computed((): { class: string } => ({
    ...attrs,
    class: stylesMerger(toValue(defaultStyles), attrs.class),
  }));
}
