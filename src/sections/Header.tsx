import { useState } from "react";
import { Button } from "../components/Button";
import { SHOP_INFO } from "../data/shopInfo";

const NAV_LINKS = [
  { href: "#thuc-don", label: "Thực đơn" },
  { href: "#gioi-thieu", label: "Giới thiệu" },
  { href: "#lien-he", label: "Liên hệ" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-brand-100 bg-cream-50/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#top" className="text-lg font-bold text-brand-800">
          {SHOP_INFO.name}
        </a>

        <nav className="hidden gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="font-medium text-brand-800 hover:text-accent-500">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button onClick={() => document.querySelector("#lien-he")?.scrollIntoView({ behavior: "smooth" })}>
            Đặt bàn / Liên hệ
          </Button>
        </div>

        <button
          type="button"
          className="text-2xl text-brand-800 md:hidden"
          aria-label="Mở menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {isMenuOpen && (
        <nav className="flex flex-col gap-1 border-t border-brand-100 bg-cream-50 px-4 py-3 md:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-2 py-2 font-medium text-brand-800 hover:bg-brand-100"
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
