import { useState, type FormEvent } from "react";
import { SectionHeading } from "../components/SectionHeading";
import { Button } from "../components/Button";
import { SHOP_INFO } from "../data/shopInfo";
import { sendContactRequest } from "../services/contactService";

type SubmitStatus = "idle" | "loading" | "success" | "error";

const NAME_MAX = 100;
const MESSAGE_MAX = 500;

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
    <section id="lien-he" className="bg-cream-50 py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 sm:px-6 md:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Liên hệ" title="Đặt bàn / Liên hệ với quán" />
          <div className="mt-6 space-y-2 text-brand-800">
            <p>📍 {SHOP_INFO.address}</p>
            <p>📞 {SHOP_INFO.phone}</p>
            <p>🕐 {SHOP_INFO.openingHours}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className="rounded-2xl border border-brand-100 bg-white p-6 shadow-sm">
          <label htmlFor="name" className="mb-1 block text-sm font-semibold text-brand-900">
            Họ tên <span className="text-accent-500">*</span>
          </label>
          <input
            id="name"
            value={name}
            maxLength={NAME_MAX}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded-lg border border-brand-200 px-3 py-2 outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20"
          />

          <label htmlFor="phone" className="mb-1 mt-4 block text-sm font-semibold text-brand-900">
            Số điện thoại <span className="text-accent-500">*</span>
          </label>
          <input
            id="phone"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className="w-full rounded-lg border border-brand-200 px-3 py-2 outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20"
          />

          <label htmlFor="message" className="mb-1 mt-4 block text-sm font-semibold text-brand-900">
            Lời nhắn (số người, giờ đến...)
          </label>
          <textarea
            id="message"
            value={message}
            maxLength={MESSAGE_MAX}
            rows={3}
            onChange={(event) => setMessage(event.target.value)}
            className="w-full rounded-lg border border-brand-200 px-3 py-2 outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20"
          />

          <Button type="submit" disabled={status === "loading"} className="mt-5 w-full">
            {status === "loading" ? "Đang gửi..." : "Gửi thông tin"}
          </Button>

          {status === "success" && (
            <p className="mt-3 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">
              Cảm ơn bạn! Quán sẽ liên hệ lại sớm nhất.
            </p>
          )}
          {status === "error" && (
            <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{errorMessage}</p>
          )}
        </form>
      </div>
    </section>
  );
}
