import type { MenuItem } from "../types/menu";
import { MENU_CATEGORIES } from "../data/menu";
import { formatPriceVND } from "../utils/format";

export function MenuCard({ item }: { item: MenuItem }) {
  const dotClass = MENU_CATEGORIES.find((category) => category.id === item.category)?.dotClass ?? "bg-yellow text-ink";

  return (
    <article className="relative rounded-[20px] border-[3px] border-ink bg-card px-5 pb-[22px] pt-6">
      <span className="absolute -top-3.5 right-4 rotate-3 whitespace-nowrap rounded-full border-[2.5px] border-ink bg-red px-3.5 py-1.5 font-display text-sm font-extrabold tabular-nums text-cream">
        {formatPriceVND(item.price)}
      </span>
      <span className={`mb-3.5 flex h-9 w-9 items-center justify-center rounded-full border-[2.5px] border-ink text-lg ${dotClass}`}>
        {item.icon}
      </span>
      <h3 className="mb-1.5 font-display text-lg font-bold text-ink">{item.name}</h3>
      <p className="text-sm font-semibold leading-relaxed text-ink/65">{item.description}</p>
    </article>
  );
}
