import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { SectionHeading } from "../components/SectionHeading";
import { LinkButton } from "../components/LinkButton";
import { Button } from "../components/Button";
import { QuantityStepper } from "../components/QuantityStepper";
import { StarRating } from "../components/StarRating";
import { ReviewModal } from "../components/ReviewModal";
import { useCart } from "../context/CartContext";
import { MENU_CATEGORIES, MENU_ITEMS } from "../data/menu";
import { REVIEWS_BY_PRODUCT } from "../data/reviews";
import { formatPriceVND } from "../utils/format";
import type { Review } from "../types/review";

const RELATED_COUNT = 3;

export function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const item = MENU_ITEMS.find((menuItem) => menuItem.id === id);

  const { addItem, openDrawer } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState<Review[]>(() => (id ? (REVIEWS_BY_PRODUCT[id] ?? []) : []));
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

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

  const averageRating = reviews.length > 0 ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : null;

  const product = item;

  function handleAddToCart() {
    addItem({ id: product.id, name: product.name, price: product.price }, quantity);
    openDrawer();
  }

  function handleReviewSubmitted(review: Review) {
    setReviews((current) => [review, ...current]);
  }

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
              <p className="mb-5 max-w-[52ch] font-medium leading-relaxed text-ink/68">{item.description}</p>

              <div className="mb-6.5 flex items-center gap-2 text-sm font-bold text-ink/60">
                {averageRating !== null ? (
                  <>
                    <StarRating value={averageRating} />
                    <span className="tabular-nums">
                      {averageRating.toFixed(1)} · {reviews.length} đánh giá
                    </span>
                  </>
                ) : (
                  <span>Chưa có đánh giá nào</span>
                )}
              </div>

              <div className="mb-6.5 h-[1.5px] bg-ink" />

              <div className="flex flex-wrap items-center gap-4">
                <QuantityStepper value={quantity} onChange={setQuantity} />
                <Button type="button" onClick={handleAddToCart}>
                  Thêm vào giỏ hàng
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t-[3px] border-ink px-6 py-16 sm:px-7 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            title="Đánh giá món ăn"
            description={
              reviews.length > 0
                ? `${reviews.length} lượt đánh giá cho món ${item.name.toLowerCase()}.`
                : `Chưa có đánh giá nào cho món ${item.name.toLowerCase()} — hãy là người đầu tiên.`
            }
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {reviews.map((review) => (
              <div key={review.id} className="flex flex-col gap-2.5 border-[1.5px] border-ink p-4.5">
                <StarRating value={review.rating} size="sm" />
                <span className="font-display text-sm font-extrabold text-ink">{review.author}</span>
                <p className="flex-1 text-sm font-medium text-ink/65">{review.text}</p>
                <span className="text-xs font-bold uppercase tracking-wide text-ink/40">{review.date}</span>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setIsReviewModalOpen(true)}
              className="flex flex-col items-center justify-center gap-2 border-[1.5px] border-dashed border-grid p-4.5 text-center font-display text-xs font-extrabold uppercase tracking-wide text-ink/50 transition-colors hover:border-ink hover:text-ink"
            >
              <span className="text-2xl font-normal leading-none">+</span>
              Viết đánh giá
            </button>
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

      <ReviewModal
        open={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        productId={item.id}
        productName={item.name}
        onSubmitted={handleReviewSubmitted}
      />
    </>
  );
}
