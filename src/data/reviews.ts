import type { Review } from "../types/review";

/**
 * Dữ liệu mẫu — đánh giá thật sẽ do người dùng gửi qua ReviewModal (lưu ở backend sau này).
 */

export const REVIEWS_BY_PRODUCT: Record<string, Review[]> = {
  "banh-cuon-thit": [
    {
      id: "rv-1",
      productId: "banh-cuon-thit",
      author: "Chị Lan",
      rating: 5,
      text: "Bánh cuốn nóng hổi, nước chấm vừa miệng, sáng nào cũng ghé.",
      date: "2 ngày trước",
    },
    {
      id: "rv-2",
      productId: "banh-cuon-thit",
      author: "Anh Tuấn",
      rating: 4,
      text: "Ngon nhưng hôm nay hơi đông, đợi hơi lâu.",
      date: "1 tuần trước",
    },
  ],
  "bun-cha-truyen-thong": [
    {
      id: "rv-3",
      productId: "bun-cha-truyen-thong",
      author: "Minh Hằng",
      rating: 5,
      text: "Chả nướng thơm mùi than hoa, nước chấm chuẩn vị Hà Nội.",
      date: "3 ngày trước",
    },
  ],
};
