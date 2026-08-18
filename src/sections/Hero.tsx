import { LinkButton } from "../components/LinkButton";

export function Hero() {
  return (
    <section className="border-b-[3px] border-ink px-6 pt-16 sm:px-7">
      <div className="mx-auto max-w-6xl pb-14">
        <span className="mb-6 inline-block border-[1.5px] border-red px-3.5 py-1 font-display text-xs font-extrabold uppercase tracking-wide text-red">
          Số đặc biệt · Bữa sáng
        </span>

        <h1 className="text-[clamp(3rem,9vw,7.2rem)] leading-[0.92] text-ink">
          Bánh cuốn
          <br />
          <span className="text-paper [-webkit-text-stroke:2px_var(--color-ink)]">Bún chả</span>
        </h1>

        <div className="mt-10 grid grid-cols-1 gap-8 border-t-[1.5px] border-ink pt-7 md:grid-cols-[2fr_1fr]">
          <p className="max-w-[56ch] text-base font-medium leading-relaxed text-ink/65 sm:text-lg">
            Tráng bánh tay từng lớp mỏng, nướng chả trên than hoa thật mỗi sáng — một quán nhỏ giữ đúng vị cũ giữa
            phố.
          </p>
          <div className="flex self-start">
            <LinkButton to="/thuc-don" variant="solid" className="border-r-0">
              Xem thực đơn
            </LinkButton>
            <LinkButton to="/lien-he" variant="line">
              Đặt bàn
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  );
}
