import { Button } from "../components/Button";
import { SHOP_INFO } from "../data/shopInfo";

export function Hero() {
  return (
    <section id="top" className="bg-gradient-to-b from-brand-800 to-brand-600">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-4 py-16 sm:px-6 md:flex-row md:py-24">
        <div className="flex-1 text-center md:text-left">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-100">
            {SHOP_INFO.openingHours}
          </p>
          <h1 className="text-4xl font-extrabold leading-tight text-cream-50 sm:text-5xl">
            {SHOP_INFO.tagline}
          </h1>
          <p className="mt-4 max-w-md text-brand-100 md:mx-0">
            {SHOP_INFO.name} — bữa sáng ngon, ấm bụng, làm mới mỗi ngày từ nguyên liệu tươi.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row md:justify-start">
            <Button onClick={() => document.querySelector("#thuc-don")?.scrollIntoView({ behavior: "smooth" })}>
              Xem thực đơn
            </Button>
            <Button
              variant="outline"
              onClick={() => document.querySelector("#lien-he")?.scrollIntoView({ behavior: "smooth" })}
            >
              Liên hệ đặt bàn
            </Button>
          </div>
        </div>

        <div className="flex-1">
          <img
            src="https://placehold.co/640x480/e6913f/fffaf2?text=Banh+Cuon+%26+Bun+Cha"
            alt="Bánh cuốn và bún chả của quán"
            className="aspect-[4/3] w-full rounded-3xl object-cover shadow-2xl"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}
