import { api } from "./api";
import type { CartItem } from "../types/cart";

export interface PlaceOrderPayload {
  items: CartItem[];
  phone: string;
  address: string;
  paymentMethod: "cod" | "transfer";
}

export interface PlaceOrderResponse {
  orderId: string;
}

export async function placeOrderRequest(payload: PlaceOrderPayload): Promise<PlaceOrderResponse> {
  const { data } = await api.post<PlaceOrderResponse>("/orders", payload);
  return data;
}
