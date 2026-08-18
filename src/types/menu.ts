export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
}

export type MenuCategory = "banh-cuon" | "bun-cha" | "do-uong" | "mon-them";

export interface MenuCategoryInfo {
  id: MenuCategory;
  label: string;
}
