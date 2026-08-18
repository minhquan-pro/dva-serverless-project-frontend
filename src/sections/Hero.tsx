import { Button } from "../components/Button";
import { SHOP_INFO } from "../data/shopInfo";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-b from-cream to-cream-deep px-4 pb-24 pt-16 sm:px-6"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-[1.1fr_0.9fr]">
        <div className="text-center md:text-left">
          <div className="mb-5 flex flex-wrap justify-center gap-2 md:justify-start">
            <span className="inline-flex items-center gap-1.5 rounded-full border-[2.5px] border-ink bg-yellow px-3.5 py-1.5 font-display text-xs font-extrabold">
              ☀️ Mở {SHOP_INFO.openingHours}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border-[2.5px] border-ink bg-white px-3.5 py-1.5 font-display text-xs font-extrabold">
              📍 Ngay góc phố
            </span>
          </div>

          <h1 className="text-4xl font-extrabold leading-[1.05] text-ink sm:text-5xl">
            Bánh cuốn &amp; bún chả
            <br />
            <span className="inline-block -rotate-2 rounded-xl border-[3px] border-ink bg-red px-3 py-0.5 text-cream">
              ngon xỉu
            </span>{" "}
            mỗi sáng!
          </h1>

          <p className="mx-auto mt-6 max-w-md font-semibold leading-relaxed text-ink/70 md:mx-0">
            Quán nhỏ, vị lớn — chả nướng than nghi ngút khói, bánh cuốn tráng nóng hổi, ăn một lần là ghiền!
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3.5 md:justify-start">
            <Button onClick={() => document.querySelector("#thuc-don")?.scrollIntoView({ behavior: "smooth" })}>
              Xem thực đơn 🍽️
            </Button>
            <Button
              variant="secondary"
              onClick={() => document.querySelector("#lien-he")?.scrollIntoView({ behavior: "smooth" })}
            >
              Đặt bàn
            </Button>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative flex aspect-square w-[min(300px,78vw)] rotate-6 items-center justify-center rounded-full border-4 border-ink bg-yellow shadow-[8px_8px_0_var(--color-ink)]">
            <span className="absolute -left-4 -top-1.5 -rotate-6 rounded-2xl border-[2.5px] border-ink bg-green px-3.5 py-2 font-display text-xs font-extrabold text-cream shadow-[3px_3px_0_var(--color-ink)]">
              Mới ra lò!
            </span>
            <span className="absolute -right-5 bottom-1.5 rotate-6 rounded-2xl border-[2.5px] border-ink bg-white px-3.5 py-2 font-display text-xs font-extrabold shadow-[3px_3px_0_var(--color-ink)]">
              Từ 5.000đ
            </span>
            <div className="-rotate-6 px-4 text-center">
              <span className="block font-display text-sm font-extrabold">QUÁN NHÀ MÌNH</span>
              <span className="my-1.5 block font-display text-3xl font-extrabold leading-none">Ăn Sáng</span>
              <span className="block font-display text-sm font-extrabold tabular-nums">5:30 — 10:30</span>
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute inset-x-0 -bottom-px h-16 bg-ink"
        style={{ clipPath: "polygon(0 40%, 100% 0, 100% 100%, 0% 100%)" }}
      />
    </section>
  );
}
