import { SHOP_INFO } from "../data/shopInfo";

export function AuthMeta() {
  return (
    <div className="mt-10 flex justify-between border-t border-grid pt-5 text-xs font-bold uppercase tracking-wide text-ink/55">
      <span>{SHOP_INFO.openingHours}</span>
      <span>{SHOP_INFO.phone}</span>
    </div>
  );
}
