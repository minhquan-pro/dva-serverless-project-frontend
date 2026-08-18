import { useMemo, useState, type ReactNode } from "react";
import { SectionHeading } from "../components/SectionHeading";
import { MenuCard } from "../components/MenuCard";
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
    <section id="thuc-don" className="bg-ink px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          tone="dark"
          kicker="Thực đơn"
          title="Chọn món của bạn"
          description="Đủ nhóm món cho một bữa sáng chắc bụng — chọn theo khẩu vị nhé!"
        />

        <div className="mt-9 mb-11 flex flex-wrap justify-center gap-2.5">
          <FilterButton active={filter === "all"} onClick={() => setFilter("all")}>
            Tất cả
          </FilterButton>
          {MENU_CATEGORIES.map((category) => (
            <FilterButton key={category.id} active={filter === category.id} onClick={() => setFilter(category.id)}>
              {category.label}
            </FilterButton>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <MenuCard key={item.id} item={item} />
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
      className={`rounded-full border-[2.5px] px-4.5 py-2 font-display text-sm font-extrabold transition-colors ${
        active ? "border-ink bg-red text-cream" : "border-[#6b5636] text-cream/80 hover:border-cream/60"
      }`}
    >
      {children}
    </button>
  );
}
