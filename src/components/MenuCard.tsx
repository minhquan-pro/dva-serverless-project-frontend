import type { MenuItem } from "../types/menu";
import { formatPriceVND } from "../utils/format";

export function MenuCard({ item }: { item: MenuItem }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-sm transition-shadow hover:shadow-md">
      <img
        src={item.image}
        alt={item.name}
        className="aspect-[4/3] w-full object-cover"
        loading="lazy"
      />
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-brand-900">{item.name}</h3>
          <span className="whitespace-nowrap font-bold text-accent-500">{formatPriceVND(item.price)}</span>
        </div>
        <p className="mt-1 text-sm text-brand-700">{item.description}</p>
      </div>
    </article>
  );
}
