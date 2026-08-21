import { useEffect, useState, type FormEvent } from "react";
import { LinkButton } from "./LinkButton";
import { QuantityStepper } from "./QuantityStepper";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { placeOrderRequest } from "../services/orderService";
import { formatPriceVND } from "../utils/format";

type PaymentMethod = "cod" | "transfer";
type OrderStatus = "idle" | "loading" | "success" | "error";

const SHIPPING_FEE = 10000;

const FIELD_CLASS =
  "w-full resize-none border-0 border-b-[1.5px] border-grid bg-transparent px-0 py-1.5 text-sm font-medium text-ink outline-none focus:border-red";

export function CartDrawer() {
  const { user } = useAuth();
  const { items, totalItems, subtotal, isDrawerOpen, closeDrawer, updateQuantity, removeItem, clearCart } = useCart();

  const [phone, setPhone] = useState(user?.phone ?? "");
  const [address, setAddress] = useState(user?.address ?? "");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [status, setStatus] = useState<OrderStatus>("idle");
  const [orderId, setOrderId] = useState("");

  const total = subtotal + (items.length > 0 ? SHIPPING_FEE : 0);

  function handleClose() {
    closeDrawer();
    setStatus("idle");
    setOrderId("");
  }

  useEffect(() => {
    if (!isDrawerOpen) return;
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") handleClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDrawerOpen]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (items.length === 0) return;
    setStatus("loading");
    try {
      const result = await placeOrderRequest({
        items,
        phone: phone.trim(),
        address: address.trim(),
        paymentMethod,
      });
      setStatus("success");
      setOrderId(result.orderId);
      clearCart();
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      {isDrawerOpen && <div onClick={handleClose} aria-hidden="true" className="fixed inset-0 z-40 bg-ink/55" />}
      <aside
        role={isDrawerOpen ? "dialog" : undefined}
        aria-modal={isDrawerOpen || undefined}
        aria-label="Giỏ hàng"
        aria-hidden={!isDrawerOpen}
        inert={!isDrawerOpen || undefined}
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-[420px] flex-col border-l-[3px] border-ink bg-paper transition-transform duration-300 ease-out ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b-[1.5px] border-ink px-6 py-5">
          <h3 className="text-lg">Giỏ hàng ({totalItems})</h3>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Đóng giỏ hàng"
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center border-[1.5px] border-ink hover:bg-paper-deep"
          >
            ✕
          </button>
        </div>

        {status === "success" ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <span className="border-[1.5px] border-red px-3.5 py-1 font-display text-xs font-extrabold uppercase tracking-wide text-red">
              Đặt hàng thành công
            </span>
            <p className="font-medium text-ink/70">
              Mã đơn <span className="font-extrabold text-ink">{orderId}</span> — quán sẽ gọi xác nhận qua{" "}
              {phone || "số điện thoại bạn để lại"}.
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="mt-2 font-display text-xs font-extrabold uppercase tracking-wide text-ink/60 hover:text-red"
            >
              Đóng
            </button>
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="font-medium text-ink/60">Giỏ hàng của bạn đang trống.</p>
            <LinkButton to="/thuc-don" variant="line" onClick={closeDrawer}>
              Xem thực đơn
            </LinkButton>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-1 flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto px-6">
              {items.map((cartItem) => (
                <div key={cartItem.id} className="flex items-center gap-3 border-b border-grid py-4">
                  <div className="flex-1">
                    <p className="text-sm font-bold text-ink">{cartItem.name}</p>
                    <p className="mt-1 text-xs font-semibold tabular-nums text-ink/50">
                      {formatPriceVND(cartItem.price)}
                    </p>
                  </div>
                  <QuantityStepper
                    value={cartItem.quantity}
                    onChange={(quantity) => updateQuantity(cartItem.id, quantity)}
                  />
                  <p className="w-20 flex-shrink-0 text-right text-sm font-extrabold tabular-nums text-ink">
                    {formatPriceVND(cartItem.price * cartItem.quantity)}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeItem(cartItem.id)}
                    aria-label={`Xoá ${cartItem.name}`}
                    className="flex-shrink-0 text-ink/35 hover:text-red"
                  >
                    ✕
                  </button>
                </div>
              ))}

              <div className="border-t-[1.5px] border-ink py-5">
                <h4 className="mb-3 font-display text-xs font-extrabold uppercase tracking-wide text-ink/55">
                  Giao hàng
                </h4>
                <div className="flex flex-col gap-3">
                  <div>
                    <label
                      htmlFor="cart-phone"
                      className="mb-1.5 block text-[0.68rem] font-bold uppercase tracking-wide text-ink/50"
                    >
                      Số điện thoại
                    </label>
                    <input
                      id="cart-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      className={FIELD_CLASS}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="cart-address"
                      className="mb-1.5 block text-[0.68rem] font-bold uppercase tracking-wide text-ink/50"
                    >
                      Địa chỉ giao hàng
                    </label>
                    <textarea
                      id="cart-address"
                      rows={2}
                      required
                      value={address}
                      onChange={(event) => setAddress(event.target.value)}
                      className={FIELD_CLASS}
                    />
                  </div>
                </div>
              </div>

              <div className="border-t-[1.5px] border-ink py-5">
                <h4 className="mb-3 font-display text-xs font-extrabold uppercase tracking-wide text-ink/55">
                  Thanh toán
                </h4>
                <div className="flex gap-3">
                  <PayOption
                    label="COD"
                    desc="Tiền mặt khi nhận"
                    active={paymentMethod === "cod"}
                    onClick={() => setPaymentMethod("cod")}
                  />
                  <PayOption
                    label="Chuyển khoản"
                    desc="QR khi xác nhận"
                    active={paymentMethod === "transfer"}
                    onClick={() => setPaymentMethod("transfer")}
                  />
                </div>
              </div>
            </div>

            <div className="border-t-[1.5px] border-ink px-6 py-5">
              <div className="mb-4 flex flex-col gap-1.5 text-sm font-semibold text-ink/60">
                <div className="flex justify-between">
                  <span>Tạm tính</span>
                  <span className="tabular-nums">{formatPriceVND(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Phí giao hàng</span>
                  <span className="tabular-nums">{formatPriceVND(SHIPPING_FEE)}</span>
                </div>
              </div>
              <div className="mb-4 flex justify-between text-lg font-extrabold text-ink">
                <span>Tổng cộng</span>
                <span className="tabular-nums text-red">{formatPriceVND(total)}</span>
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full border-[1.5px] border-ink bg-ink py-3.5 font-display text-sm font-extrabold uppercase tracking-wide text-paper transition-colors hover:border-red hover:bg-red disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "loading" ? "Đang đặt hàng..." : "Đặt hàng"}
              </button>
              {status === "error" && (
                <p className="mt-3 text-sm font-bold text-red">Đặt hàng thất bại, vui lòng thử lại.</p>
              )}
            </div>
          </form>
        )}
      </aside>
    </>
  );
}

function PayOption({
  label,
  desc,
  active,
  onClick,
}: {
  label: string;
  desc: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 border-[1.5px] border-ink p-3.5 text-left transition-colors ${
        active ? "bg-ink text-paper" : "bg-paper text-ink hover:bg-paper-deep"
      }`}
    >
      <span className="block text-sm font-extrabold">{label}</span>
      <span className={`mt-0.5 block text-xs font-semibold ${active ? "text-paper/70" : "text-ink/55"}`}>{desc}</span>
    </button>
  );
}
