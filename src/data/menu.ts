import type { MenuCategoryInfo, MenuItem } from "../types/menu";

/**
 * Dữ liệu mẫu — thay bằng tên món/giá thật của quán khi có.
 */

export const MENU_CATEGORIES: MenuCategoryInfo[] = [
  { id: "banh-cuon", label: "Bánh cuốn", dotClass: "bg-yellow text-ink" },
  { id: "bun-cha", label: "Bún chả", dotClass: "bg-red text-cream" },
  { id: "do-uong", label: "Đồ uống", dotClass: "bg-green text-cream" },
  { id: "mon-them", label: "Món thêm", dotClass: "bg-yellow text-ink" },
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "banh-cuon-thit",
    name: "Bánh cuốn thịt",
    description: "Nhân thịt băm, mộc nhĩ, chả lụa, hành phi, nước mắm chua ngọt.",
    price: 30000,
    category: "banh-cuon",
    icon: "🥟",
  },
  {
    id: "banh-cuon-trung",
    name: "Bánh cuốn trứng",
    description: "Bánh tráng mỏng kèm trứng gà, chả quế và rau thơm.",
    price: 32000,
    category: "banh-cuon",
    icon: "🥟",
  },
  {
    id: "bun-cha-truyen-thong",
    name: "Bún chả truyền thống",
    description: "Chả viên và chả miếng nướng than hoa, nước chấm chua ngọt, rau sống.",
    price: 40000,
    category: "bun-cha",
    icon: "🍢",
  },
  {
    id: "bun-cha-nem",
    name: "Bún chả nem cua bể",
    description: "Kèm nem cua bể giòn rụm, đầy đặn cho bữa sáng chắc bụng.",
    price: 45000,
    category: "bun-cha",
    icon: "🍢",
  },
  {
    id: "tra-da",
    name: "Trà đá",
    description: "Mát lạnh, giải nhiệt cho bữa sáng thêm ngon miệng.",
    price: 5000,
    category: "do-uong",
    icon: "🧊",
  },
  {
    id: "ca-phe-sua-da",
    name: "Cà phê sữa đá",
    description: "Cà phê phin truyền thống, sữa đặc béo ngậy, đá mát lạnh.",
    price: 20000,
    category: "do-uong",
    icon: "☕",
  },
  {
    id: "nem-ran",
    name: "Nem rán",
    description: "Giòn rụm, nhân thịt, mộc nhĩ, miến, ăn kèm nước chấm.",
    price: 15000,
    category: "mon-them",
    icon: "🍤",
  },
];
