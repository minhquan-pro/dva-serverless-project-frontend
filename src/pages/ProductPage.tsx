import { Link, useParams } from "react-router-dom";
import { SectionHeading } from "../components/SectionHeading";
import { LinkButton } from "../components/LinkButton";
import { SHOP_INFO } from "../data/shopInfo";
import { MENU_CATEGORIES, MENU_ITEMS } from "../data/menu";
import { formatPriceVND } from "../utils/format";

const RELATED_COUNT = 3;

export function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const item = MENU_ITEMS.find((menuItem) => menuItem.id === id);

  if (!item) {
    return (
      <section className="px-6 py-24 text-center sm:px-7 sm:py-32">
        <span className="font-display text-sm font-extrabold text-red">404</span>
        <h1 className="mt-4 text-4xl sm:text-5xl">Không tìm thấy món</h1>
        <p className="mx-auto mt-4 max-w-[46ch] font-medium text-ink/65">
          Món ăn này không tồn tại hoặc đã bị gỡ khỏi thực đơn.
        </p>
        <LinkButton to="/thuc-don" variant="solid" className="mt-8">
          Xem thực đơn
        </LinkButton>
      </section>
    );
  }

  const categoryLabel = MENU_CATEGORIES.find((category) => category.id === item.category)?.label ?? item.category;

  const others = MENU_ITEMS.map((menuItem, index) => ({ menuItem, number: index + 1 })).filter(
    ({ menuItem }) => menuItem.id !== item.id,
  );
  const related = [
    ...others.filter(({ menuItem }) => menuItem.category === item.category),
    ...others.filter(({ menuItem }) => menuItem.category !== item.category),
  ].slice(0, RELATED_COUNT);

  return (
    <>
      <section className="px-6 pb-16 pt-9 sm:px-7 sm:pt-10">
        <div className="mx-auto max-w-5xl">
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 font-display text-xs font-extrabold uppercase tracking-wide text-ink/60 hover:text-red"
          >
            ← Quay lại thực đơn
          </Link>

          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="relative aspect-[4/3] border-[1.5px] border-ink bg-paper-deep">
              <div className="absolute inset-3.5 border border-dashed border-grid" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 px-6 text-center">
                <svg viewBox="0 0 24 24" fill="none" className="h-10 w-10 text-ink/35">
                  <rect x="3" y="3" width="18" height="18" strokeWidth="1.4" stroke="currentColor" />
                  <circle cx="9" cy="9" r="1.6" strokeWidth="1.4" stroke="currentColor" />
                  <path d="M21 15l-5-5-9 9" strokeWidth="1.4" stroke="currentColor" />
                </svg>
                <span className="text-xs font-extrabold uppercase tracking-wide text-ink/45">Ảnh món ăn</span>
                <span className="text-[0.7rem] font-semibold text-ink/35">sẽ được cập nhật</span>
              </div>
            </div>

            <div>
              <span className="mb-4.5 inline-block border-[1.5px] border-red px-3.5 py-1 font-display text-xs font-extrabold uppercase tracking-wide text-red">
                {categoryLabel}
              </span>
              <h1 className="mb-4 text-4xl sm:text-[2.6rem]">{item.name}</h1>
              <div className="mb-5.5 text-2xl font-extrabold tabular-nums text-red">{formatPriceVND(item.price)}</div>
              <p className="mb-7.5 max-w-[52ch] font-medium leading-relaxed text-ink/68">{item.description}</p>

              <div className="mb-6.5 h-[1.5px] bg-ink" />

              <div className="flex flex-col items-start gap-2.5">
                <button
                  type="button"
                  disabled
                  className="inline-flex cursor-not-allowed items-center gap-2.5 border-[1.5px] border-ink bg-paper-deep px-7 py-3.5 font-display text-sm font-extrabold uppercase tracking-wide text-ink/40"
                >
                  <svg viewBox="0 0 24 24" fill="none" className="h-4.5 w-4.5">
                    <circle cx="9" cy="20" r="1.4" stroke="currentColor" strokeWidth="1.6" />
                    <circle cx="18" cy="20" r="1.4" stroke="currentColor" strokeWidth="1.6" />
                    <path
                      d="M2 3h2l2.4 12.2a2 2 0 002 1.8h8.6a2 2 0 002-1.6L21 8H6"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                  </svg>
                  Thêm vào giỏ hàng
                </button>
                <p className="text-sm font-semibold text-ink/60">
                  Tính năng đặt món online sắp ra mắt — gọi{" "}
                  <a
                    href={`tel:${SHOP_INFO.phone.replace(/\s+/g, "")}`}
                    className="font-extrabold text-red underline underline-offset-2"
                  >
                    {SHOP_INFO.phone}
                  </a>{" "}
                  để đặt trước.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t-[3px] border-ink px-6 py-16 sm:px-7 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            title="Món liên quan"
            description={`Khách gọi ${item.name.toLowerCase()} thường chọn thêm những món này.`}
          />

          <div className="grid grid-cols-1 gap-px border border-grid bg-grid sm:grid-cols-3">
            {related.map(({ menuItem, number }) => (
              <Link
                key={menuItem.id}
                to={`/thuc-don/${menuItem.id}`}
                className="block bg-paper p-6 transition-colors hover:bg-paper-deep"
              >
                <span className="mb-2.5 block font-display text-xs font-extrabold text-red tabular-nums">
                  {String(number).padStart(2, "0")}
                </span>
                <h3 className="mb-2 text-base font-extrabold normal-case text-ink">{menuItem.name}</h3>
                <span className="font-bold tabular-nums text-ink">{formatPriceVND(menuItem.price)}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
