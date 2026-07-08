export type NavLink = {
  label: string;
  href: string;
  auth?: boolean;
  guest?: boolean;
  imageLink?: string;
  badgeValue?: number;
  action?: boolean;
};
