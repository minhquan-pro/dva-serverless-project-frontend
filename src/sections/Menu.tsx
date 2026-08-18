import { useMemo, useState, type ReactNode } from "react";
import { SectionHeading } from "../components/SectionHeading";
import { MenuRow } from "../components/MenuRow";
import { MENU_CATEGORIES, MENU_ITEMS } from "../data/menu";
import type { MenuCategory } from "../types/menu";

type FilterValue = MenuCategory | "all";

export function Menu() {
  const [filter, setFilter] = useState<FilterValue>("all");

  const items = useMemo(
    () => (filter === "all" ? MENU_ITEMS : MENU_ITEMS.filter((item) => item.category === filter)),
    [filter],
  );

  return (
    <section id="thuc-don" className="border-b-[3px] border-ink px-6 py-16 sm:px-7 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="01" title="Thực đơn" />

        <div className="mb-11 flex w-fit flex-wrap divide-x-[1.5px] divide-ink border-[1.5px] border-ink">
          <FilterButton active={filter === "all"} onClick={() => setFilter("all")}>
            Tất cả
          </FilterButton>
          {MENU_CATEGORIES.map((category) => (
            <FilterButton key={category.id} active={filter === category.id} onClick={() => setFilter(category.id)}>
              {category.label}
            </FilterButton>
          ))}
        </div>

        <div className="max-w-3xl">
          {items.map((item, i) => (
            <MenuRow key={item.id} item={item} number={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4.5 py-2.5 font-display text-xs font-extrabold uppercase tracking-wide transition-colors ${
        active ? "bg-ink text-paper" : "bg-paper text-ink hover:bg-paper-deep"
      }`}
    >
      {children}
    </button>
  );
}
