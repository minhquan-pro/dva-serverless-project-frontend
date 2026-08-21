import { api } from "./api";
import type { Review } from "../types/review";

export interface SubmitReviewPayload {
  productId: string;
  rating: number;
  text: string;
  author: string;
}

export async function submitReviewRequest(payload: SubmitReviewPayload): Promise<Review> {
  const { data } = await api.post<Review>("/reviews", payload);
  return data;
}
