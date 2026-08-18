import { SHOP_INFO } from "../data/shopInfo";

export function Footer() {
  return (
    <footer className="bg-brand-900 py-8 text-brand-100">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 text-center sm:px-6">
        <p className="font-semibold text-cream-50">{SHOP_INFO.name}</p>
        <p className="text-sm">{SHOP_INFO.address}</p>
        <div className="flex gap-4 text-sm">
          <a href={SHOP_INFO.facebook} className="hover:text-cream-50" target="_blank" rel="noreferrer">
            Facebook
          </a>
          <a href={SHOP_INFO.zalo} className="hover:text-cream-50" target="_blank" rel="noreferrer">
            Zalo
          </a>
        </div>
        <p className="mt-2 text-xs text-brand-300">
          © {new Date().getFullYear()} {SHOP_INFO.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
