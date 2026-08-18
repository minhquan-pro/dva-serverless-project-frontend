import { useState } from "react";
import { SHOP_INFO } from "../data/shopInfo";

const NAV_LINKS = [
  { href: "#thuc-don", label: "Thực đơn" },
  { href: "#gioi-thieu", label: "Giới thiệu" },
  { href: "#lien-he", label: "Liên hệ" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b-[3px] border-ink bg-cream">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-ink bg-red text-lg">
            🌶️
          </span>
          <span className="font-display text-lg font-extrabold text-ink">{SHOP_INFO.name}</span>
        </a>

        <nav className="hidden gap-2 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full border-[2.5px] border-transparent px-4 py-2 font-display text-sm font-extrabold text-ink transition-colors hover:border-ink hover:bg-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#lien-he"
          className="hidden items-center gap-2 rounded-full border-[3px] border-ink bg-green px-5 py-2.5 font-display text-sm font-extrabold text-cream shadow-[3px_3px_0_var(--color-ink)] transition-shadow hover:shadow-[1px_1px_0_var(--color-ink)] md:inline-flex"
        >
          Đặt bàn ngay
        </a>

        <button
          type="button"
          className="rounded-xl border-[2.5px] border-ink bg-white px-3 py-2 text-lg md:hidden"
          aria-label="Mở menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {isMenuOpen && (
        <nav className="flex flex-col gap-1 border-t-[3px] border-ink bg-cream px-4 py-3 md:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-2 py-2 font-display font-extrabold text-ink hover:bg-white"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
