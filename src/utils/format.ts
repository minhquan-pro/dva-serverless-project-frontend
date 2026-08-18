export function formatPriceVND(price: number): string {
  return price.toLocaleString("vi-VN") + "đ";
}
