export type NavLink = {
  label: string;
  href: string;
  auth?: boolean;
  guest?: boolean;
  imageLink?: string;
  badgeValue?: number;
  action?: boolean;
};

export type DeepPartial<T> = { [P in keyof T]?: Partial<T[P]> };
