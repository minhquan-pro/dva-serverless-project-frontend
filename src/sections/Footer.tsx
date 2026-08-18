import { SHOP_INFO } from "../data/shopInfo";

export function Footer() {
  return (
    <footer className="bg-ink px-4 py-7 text-center sm:px-6">
      <p className="font-display text-sm font-extrabold text-cream/85">
        © {new Date().getFullYear()} {SHOP_INFO.name} — Phố Ẩm Thực
      </p>
    </footer>
  );
}
