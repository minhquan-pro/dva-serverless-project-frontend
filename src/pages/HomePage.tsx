import { Hero } from "../sections/Hero";
import { SectionHeading } from "../components/SectionHeading";
import { MenuRow } from "../components/MenuRow";
import { LinkButton } from "../components/LinkButton";
import { MENU_ITEMS } from "../data/menu";

const FEATURED_ITEMS = MENU_ITEMS.slice(0, 3);

export function HomePage() {
  return (
    <>
      <Hero />

      <section className="border-b-[3px] border-ink px-6 py-16 sm:px-7 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading title="Món nổi bật" description="Vài món khách quen hay gọi nhất — xem đầy đủ thực đơn bên dưới." />
          <div className="max-w-3xl">
            {FEATURED_ITEMS.map((item, i) => (
              <MenuRow key={item.id} item={item} number={i + 1} />
            ))}
          </div>
          <LinkButton to="/thuc-don" variant="line" className="mt-9">
            Xem toàn bộ thực đơn →
          </LinkButton>
        </div>
      </section>

      <section className="bg-ink px-6 py-16 text-center text-paper sm:px-7 sm:py-20">
        <h2 className="text-3xl sm:text-4xl">Ghé quán hoặc đặt bàn trước</h2>
        <p className="mx-auto mt-4 max-w-[50ch] font-medium text-paper/70">
          Quán mở cửa 5:30 – 10:30 hằng ngày — gọi trước hoặc để lại lời nhắn, quán sẽ liên hệ lại sớm.
        </p>
        <LinkButton to="/lien-he" variant="red" className="mt-8 border-red">
          Liên hệ ngay
        </LinkButton>
      </section>
    </>
  );
}
