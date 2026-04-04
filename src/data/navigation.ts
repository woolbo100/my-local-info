import { CATEGORY_ORDER, getCategoryConfig } from "@/lib/content-config";

export interface NavItem {
  title: string;
  href: string;
}

export const navigation: NavItem[] = [
  ...CATEGORY_ORDER.map((category) => {
    const config = getCategoryConfig(category);
    return {
      title: config.label,
      href: `/${config.route}`,
    };
  }),
  { title: "소개", href: "/about" },
];
