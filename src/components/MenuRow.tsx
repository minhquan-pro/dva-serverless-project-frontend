import type { MenuItem } from "../types/menu";
import { formatPriceVND } from "../utils/format";

export function MenuRow({ item, number }: { item: MenuItem; number: number }) {
  return (
    <div className="grid grid-cols-[40px_1fr] items-baseline gap-x-4 gap-y-1.5 border-t border-grid py-5 sm:grid-cols-[64px_1fr_auto] sm:gap-x-5 sm:py-6 [&:last-child]:border-b">
      <span className="font-display text-sm font-extrabold text-red tabular-nums">
        {String(number).padStart(2, "0")}
      </span>
      <div>
        <h3 className="text-lg font-extrabold normal-case text-ink sm:text-xl">{item.name}</h3>
        <p className="mt-1.5 text-sm font-medium normal-case leading-relaxed text-ink/60">{item.description}</p>
      </div>
      <span className="col-start-2 whitespace-nowrap text-lg font-extrabold text-ink tabular-nums sm:col-start-auto">
        {formatPriceVND(item.price)}
      </span>
    </div>
  );
}
