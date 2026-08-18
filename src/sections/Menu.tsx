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
    <section id="thuc-don" className="bg-cream-50 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Thực đơn"
          title="Món ngon mỗi sáng"
          description="Thực đơn mẫu — cập nhật ảnh, tên món và giá thật khi quán sẵn sàng."
        />

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          <FilterButton active={filter === "all"} onClick={() => setFilter("all")}>
            Tất cả
          </FilterButton>
          {MENU_CATEGORIES.map((category) => (
            <FilterButton key={category.id} active={filter === category.id} onClick={() => setFilter(category.id)}>
              {category.label}
            </FilterButton>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
      className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
        active ? "bg-accent-500 text-cream-50" : "bg-brand-100 text-brand-800 hover:bg-brand-200"
      }`}
    >
      {children}
    </button>
  );
}
