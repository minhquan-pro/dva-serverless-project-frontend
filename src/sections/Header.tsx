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
    <div className="border-b-[3px] border-ink">
      <div className="flex justify-between border-b border-grid px-6 py-2 font-display text-xs font-bold uppercase tracking-wide text-ink/60 sm:px-7">
        <span>Ấn bản mỗi sáng</span>
        <span className="tabular-nums">{SHOP_INFO.openingHours.split(" ")[0]}</span>
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-7">
        <a href="#top" className="font-display text-2xl font-extrabold uppercase tracking-tight text-ink">
          Nhà Mình <span className="text-red">Ăn Sáng</span>
        </a>

        <nav className="hidden divide-x-[1.5px] divide-ink border-[1.5px] border-ink md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-5 py-2.5 font-display text-xs font-extrabold uppercase tracking-wide text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="border-[1.5px] border-ink bg-paper px-3 py-2 text-lg md:hidden"
          aria-label="Mở menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {isMenuOpen && (
        <nav className="flex flex-col border-t-[1.5px] border-ink md:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="border-b border-grid px-7 py-3 font-display text-sm font-extrabold uppercase tracking-wide text-ink hover:bg-paper-deep"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </div>
  );
}
