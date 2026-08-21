import { useState, type FormEvent } from "react";
import { Modal } from "./Modal";
import { StarRating } from "./StarRating";
import { useAuth } from "../context/AuthContext";
import { submitReviewRequest } from "../services/reviewService";
import type { Review } from "../types/review";

type Status = "idle" | "loading" | "error";

const TEXT_MAX = 300;

const FIELD_CLASS =
  "w-full resize-none border-0 border-b-[1.5px] border-grid bg-transparent px-0 py-2 text-sm font-medium text-ink outline-none focus:border-red";

interface ReviewModalProps {
  open: boolean;
  onClose: () => void;
  productId: string;
  productName: string;
  onSubmitted: (review: Review) => void;
}

export function ReviewModal({ open, onClose, productId, productName, onSubmitted }: ReviewModalProps) {
  const { user } = useAuth();
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  function handleClose() {
    setStatus("idle");
    setText("");
    setRating(5);
    onClose();
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!text.trim()) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      const review = await submitReviewRequest({
        productId,
        rating,
        text: text.trim(),
        author: user?.name ?? "Khách ẩn danh",
      });
      onSubmitted(review);
      handleClose();
    } catch {
      setStatus("error");
    }
  }

  return (
    <Modal open={open} onClose={handleClose} title={`Đánh giá ${productName}`}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <span className="mb-3 block text-xs font-bold uppercase tracking-wide text-ink/55">Chọn số sao</span>
          <StarRating value={rating} onChange={setRating} size="lg" />
        </div>
        <div>
          <label htmlFor="review-text" className="mb-2 block text-xs font-bold uppercase tracking-wide text-ink/55">
            Nhận xét của bạn
          </label>
          <textarea
            id="review-text"
            rows={3}
            maxLength={TEXT_MAX}
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Món ăn thế nào?"
            className={FIELD_CLASS}
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full border-[1.5px] border-ink bg-ink py-3.5 font-display text-sm font-extrabold uppercase tracking-wide text-paper transition-colors hover:border-red hover:bg-red disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading" ? "Đang gửi..." : "Gửi đánh giá"}
        </button>
        {status === "error" && (
          <p className="text-sm font-bold text-red">
            {text.trim() ? "Gửi đánh giá thất bại, vui lòng thử lại." : "Vui lòng nhập nhận xét trước khi gửi."}
          </p>
        )}
      </form>
    </Modal>
  );
}
