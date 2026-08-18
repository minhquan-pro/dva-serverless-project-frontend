import type { MenuCategoryInfo, MenuItem } from "../types/menu";

/**
 * Dữ liệu mẫu — thay bằng ảnh/tên món/giá thật của quán khi có.
 */

export const MENU_CATEGORIES: MenuCategoryInfo[] = [
  { id: "banh-cuon", label: "Bánh cuốn" },
  { id: "bun-cha", label: "Bún chả" },
  { id: "do-uong", label: "Đồ uống" },
  { id: "mon-them", label: "Món thêm" },
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "banh-cuon-thit",
    name: "Bánh cuốn thịt",
    description: "Bánh cuốn nóng nhân thịt băm, mộc nhĩ, chả lụa, hành phi, nước mắm chua ngọt.",
    price: 30000,
    category: "banh-cuon",
    image: "https://placehold.co/600x450/f3d19f/6f3319?text=Banh+Cuon+Thit",
  },
  {
    id: "banh-cuon-trung",
    name: "Bánh cuốn trứng",
    description: "Bánh cuốn tráng mỏng kèm trứng gà, ăn cùng chả quế và rau thơm.",
    price: 32000,
    category: "banh-cuon",
    image: "https://placehold.co/600x450/f3d19f/6f3319?text=Banh+Cuon+Trung",
  },
  {
    id: "bun-cha-truyen-thong",
    name: "Bún chả truyền thống",
    description: "Chả viên và chả miếng nướng than hoa, ăn kèm bún, nước chấm chua ngọt, rau sống.",
    price: 40000,
    category: "bun-cha",
    image: "https://placehold.co/600x450/ecb267/6f3319?text=Bun+Cha",
  },
  {
    id: "bun-cha-nem",
    name: "Bún chả nem cua bể",
    description: "Bún chả kèm nem cua bể giòn rụm, đầy đặn cho bữa sáng chắc bụng.",
    price: 45000,
    category: "bun-cha",
    image: "https://placehold.co/600x450/ecb267/6f3319?text=Bun+Cha+Nem",
  },
  {
    id: "tra-da",
    name: "Trà đá",
    description: "Trà đá mát lạnh, giải nhiệt cho bữa sáng thêm ngon miệng.",
    price: 5000,
    category: "do-uong",
    image: "https://placehold.co/600x450/fbf1e0/8f3f1b?text=Tra+Da",
  },
  {
    id: "ca-phe-sua-da",
    name: "Cà phê sữa đá",
    description: "Cà phê phin truyền thống, sữa đặc béo ngậy, đá mát lạnh.",
    price: 20000,
    category: "do-uong",
    image: "https://placehold.co/600x450/fbf1e0/8f3f1b?text=Ca+Phe+Sua+Da",
  },
  {
    id: "nem-ran",
    name: "Nem rán",
    description: "Nem rán giòn rụm, nhân thịt, mộc nhĩ, miến, ăn kèm nước chấm.",
    price: 15000,
    category: "mon-them",
    image: "https://placehold.co/600x450/faead1/b5551a?text=Nem+Ran",
  },
];
