import { SHOP_INFO } from "../data/shopInfo";

export function Footer() {
  return (
    <footer className="flex flex-col gap-2 px-6 py-6 font-display text-xs font-bold uppercase tracking-wide text-ink/60 sm:flex-row sm:justify-between sm:px-7">
      <span>
        © {new Date().getFullYear()} {SHOP_INFO.name}
      </span>
      <span>Ấn Bản Sáng</span>
    </footer>
  );
}
