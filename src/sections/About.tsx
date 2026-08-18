import { SHOP_INFO } from "../data/shopInfo";

const STATS = [
  { value: SHOP_INFO.openingHours.split(" ")[0], label: "Mở cửa mỗi sáng" },
  { value: "100%", label: "Than hoa thật" },
  { value: "7 món", label: "Trong thực đơn" },
];

export function About() {
  return (
    <section id="gioi-thieu" className="bg-cream px-4 py-20 sm:px-6">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 md:grid-cols-2">
        <div className="flex aspect-[4/3] items-center justify-center rounded-3xl border-[3px] border-ink bg-green shadow-[8px_8px_0_var(--color-ink)]">
          <svg viewBox="0 0 120 120" fill="none" className="h-[56%] w-[56%]">
            <circle cx="60" cy="60" r="42" stroke="#241505" strokeWidth="4" />
            <path d="M38 66c5 9 13 15 22 15s17-6 22-15" stroke="#FFF8EC" strokeWidth="4" strokeLinecap="round" />
            <circle cx="46" cy="50" r="4" fill="#FFF8EC" />
            <circle cx="74" cy="50" r="4" fill="#FFF8EC" />
          </svg>
        </div>

        <div>
          <span className="inline-block rounded-full bg-red px-4 py-1.5 font-display text-xs font-bold uppercase tracking-wide text-cream">
            Giới thiệu
          </span>
          <h2 className="mt-4 text-3xl font-extrabold text-ink sm:text-4xl">Quán nhỏ, tình cảm to!</h2>
          <p className="mt-4 font-semibold leading-relaxed text-ink/70">
            Từ gánh hàng rong thành quán quen của cả xóm — vẫn giữ lửa than, vẫn tráng bánh tay, chỉ thêm vào chút màu
            sắc và năng lượng mỗi sáng.
          </p>

          <div className="mt-7 flex flex-wrap gap-3.5">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border-[2.5px] border-ink bg-yellow px-4.5 py-3.5 shadow-[3px_3px_0_var(--color-ink)]"
              >
                <strong className="block font-display text-xl font-extrabold text-ink">{stat.value}</strong>
                <span className="text-xs font-extrabold uppercase tracking-wide text-ink/80">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
