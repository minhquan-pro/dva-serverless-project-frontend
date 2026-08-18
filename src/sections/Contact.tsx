import { useState, type FormEvent } from "react";
import { SectionHeading } from "../components/SectionHeading";
import { SHOP_INFO } from "../data/shopInfo";
import { sendContactRequest } from "../services/contactService";

type SubmitStatus = "idle" | "loading" | "success" | "error";

const NAME_MAX = 100;
const MESSAGE_MAX = 500;

const INPUT_CLASS =
  "w-full border-0 border-b-[1.5px] border-paper/30 bg-transparent px-0 py-2 font-medium text-paper outline-none focus:border-red";

export function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function validate(): string | null {
    if (!name.trim()) return "Vui lòng nhập tên của bạn";
    if (!phone.trim()) return "Vui lòng nhập số điện thoại";
    if (!/^[0-9+\s]{8,15}$/.test(phone.trim())) return "Số điện thoại không hợp lệ";
    return null;
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const validationError = validate();
    if (validationError) {
      setStatus("error");
      setErrorMessage(validationError);
      return;
    }

    setStatus("loading");
    setErrorMessage("");
    try {
      await sendContactRequest({ name: name.trim(), phone: phone.trim(), message: message.trim() });
      setStatus("success");
      setName("");
      setPhone("");
      setMessage("");
    } catch {
      setStatus("error");
      setErrorMessage("Gửi thông tin thất bại, vui lòng thử lại hoặc gọi trực tiếp cho quán.");
    }
  }

  return (
    <section className="bg-ink px-6 py-16 text-paper sm:px-7 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading tone="dark" title="Liên hệ" />

        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_1.1fr]">
          <div className="flex flex-col gap-5">
            <InfoRow label="Địa chỉ">{SHOP_INFO.address}</InfoRow>
            <InfoRow label="Điện thoại">{SHOP_INFO.phone}</InfoRow>
            <InfoRow label="Giờ mở cửa">{SHOP_INFO.openingHours}</InfoRow>
          </div>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            <div>
              <label htmlFor="name" className="mb-2 block text-xs font-bold uppercase tracking-wide text-paper/60">
                Họ tên
              </label>
              <input
                id="name"
                value={name}
                maxLength={NAME_MAX}
                onChange={(event) => setName(event.target.value)}
                className={INPUT_CLASS}
              />
            </div>

            <div>
              <label htmlFor="phone" className="mb-2 block text-xs font-bold uppercase tracking-wide text-paper/60">
                Số điện thoại
              </label>
              <input
                id="phone"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className={INPUT_CLASS}
              />
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block text-xs font-bold uppercase tracking-wide text-paper/60">
                Lời nhắn (số người, giờ đến...)
              </label>
              <textarea
                id="message"
                value={message}
                maxLength={MESSAGE_MAX}
                rows={3}
                onChange={(event) => setMessage(event.target.value)}
                className={INPUT_CLASS}
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-2 self-start border-[1.5px] border-red bg-red px-7 py-3.5 font-display text-sm font-extrabold uppercase tracking-wide text-paper transition-colors hover:bg-transparent hover:text-red disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "loading" ? "Đang gửi..." : "Gửi thông tin"}
            </button>

            {status === "success" && (
              <p className="text-sm font-bold text-paper">Cảm ơn bạn! Quán sẽ liên hệ lại sớm nhất.</p>
            )}
            {status === "error" && <p className="text-sm font-bold text-red">{errorMessage}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}

function InfoRow({ label, children }: { label: string; children: string }) {
  return (
    <div>
      <span className="block text-xs font-bold uppercase tracking-wide text-paper/50">{label}</span>
      <span className="mt-1.5 block text-lg font-bold">{children}</span>
    </div>
  );
}
