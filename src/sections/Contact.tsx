import { useState, type FormEvent, type ReactNode } from "react";
import { SectionHeading } from "../components/SectionHeading";
import { Button } from "../components/Button";
import { SHOP_INFO } from "../data/shopInfo";
import { sendContactRequest } from "../services/contactService";

type SubmitStatus = "idle" | "loading" | "success" | "error";

const NAME_MAX = 100;
const MESSAGE_MAX = 500;

const INPUT_CLASS =
  "w-full rounded-xl border-[2.5px] border-ink bg-white px-3.5 py-2.5 font-semibold outline-none focus:outline-[3px] focus:outline-yellow";

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
    <section id="lien-he" className="bg-red px-4 py-20 sm:px-6">
      <SectionHeading
        tone="dark"
        kicker="Liên hệ"
        title="Ghé quán ngay hôm nay!"
        description="Hoặc để lại lời nhắn, quán gọi lại liền!"
      />

      <div className="mx-auto mt-11 grid max-w-4xl grid-cols-1 gap-9 rounded-3xl border-[3px] border-ink bg-card p-8 shadow-[8px_8px_0_var(--color-ink)] sm:p-10 md:grid-cols-[1fr_1.1fr]">
        <div className="flex flex-col gap-4.5">
          <InfoRow icon="📍">{SHOP_INFO.address}</InfoRow>
          <InfoRow icon="📞">{SHOP_INFO.phone}</InfoRow>
          <InfoRow icon="⏰">{SHOP_INFO.openingHours}</InfoRow>
        </div>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3.5">
          <div>
            <label htmlFor="name" className="mb-2 block text-xs font-extrabold uppercase tracking-wide text-ink/70">
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
            <label htmlFor="phone" className="mb-2 block text-xs font-extrabold uppercase tracking-wide text-ink/70">
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
            <label htmlFor="message" className="mb-2 block text-xs font-extrabold uppercase tracking-wide text-ink/70">
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

          <Button variant="dark" type="submit" disabled={status === "loading"} className="mt-1 justify-center">
            {status === "loading" ? "Đang gửi..." : "Gửi thông tin 🎉"}
          </Button>

          {status === "success" && (
            <p className="text-sm font-bold text-green">Cảm ơn bạn! Quán sẽ liên hệ lại sớm nhất.</p>
          )}
          {status === "error" && <p className="text-sm font-bold text-red-deep">{errorMessage}</p>}
        </form>
      </div>
    </section>
  );
}

function InfoRow({ icon, children }: { icon: string; children: ReactNode }) {
  return (
    <div className="flex items-start gap-3.5 font-bold text-ink">
      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[10px] border-[2.5px] border-ink bg-yellow">
        {icon}
      </span>
      <span className="pt-1.5">{children}</span>
    </div>
  );
}
