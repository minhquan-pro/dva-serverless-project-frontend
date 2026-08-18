import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SectionHeading } from "../components/SectionHeading";
import { Button } from "../components/Button";
import { AuthTabs } from "../components/AuthTabs";
import { AuthMeta } from "../components/AuthMeta";
import { useAuth } from "../context/AuthContext";

type SubmitStatus = "idle" | "loading" | "error";

const INPUT_CLASS =
  "w-full border-0 border-b-[1.5px] border-grid bg-transparent px-0 py-2 font-medium text-ink outline-none focus:border-red";

export function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function validate(): string | null {
    if (!name.trim()) return "Vui lòng nhập họ tên";
    if (!/^[0-9+\s]{8,15}$/.test(phone.trim())) return "Số điện thoại không hợp lệ";
    if (password.length < 6) return "Mật khẩu cần ít nhất 6 ký tự";
    if (password !== confirmPassword) return "Mật khẩu nhập lại không khớp";
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
      await register({ name: name.trim(), phone: phone.trim(), password });
      navigate("/tai-khoan", { replace: true });
    } catch {
      setStatus("error");
      setErrorMessage("Đăng ký thất bại, số điện thoại có thể đã được sử dụng.");
    }
  }

  return (
    <section className="px-6 py-16 sm:px-7 sm:py-20">
      <div className="mx-auto max-w-md">
        <span className="mb-6 inline-block border-[1.5px] border-red px-3.5 py-1 font-display text-xs font-extrabold uppercase tracking-wide text-red">
          Thành viên · Quán nhà
        </span>

        <AuthTabs />

        <SectionHeading title="Đăng ký" description="Tạo tài khoản bằng số điện thoại — dùng để chuẩn bị cho tính năng đặt món online sắp tới." />

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
          <div>
            <label htmlFor="name" className="mb-2 block text-xs font-bold uppercase tracking-wide text-ink/60">
              Họ tên
            </label>
            <input
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className={INPUT_CLASS}
            />
          </div>

          <div>
            <label htmlFor="phone" className="mb-2 block text-xs font-bold uppercase tracking-wide text-ink/60">
              Số điện thoại
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className={INPUT_CLASS}
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-xs font-bold uppercase tracking-wide text-ink/60">
              Mật khẩu
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={INPUT_CLASS}
            />
          </div>

          <div>
            <label
              htmlFor="confirm-password"
              className="mb-2 block text-xs font-bold uppercase tracking-wide text-ink/60"
            >
              Nhập lại mật khẩu
            </label>
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className={INPUT_CLASS}
            />
          </div>

          <Button type="submit" disabled={status === "loading"} className="mt-2 justify-center">
            {status === "loading" ? "Đang tạo tài khoản..." : "Đăng ký"}
          </Button>

          {status === "error" && <p className="text-sm font-bold text-red">{errorMessage}</p>}
        </form>

        <p className="mt-7 text-sm font-medium text-ink/70">
          Đã có tài khoản?{" "}
          <Link to="/dang-nhap" className="font-bold text-red underline underline-offset-2">
            Đăng nhập
          </Link>
        </p>

        <AuthMeta />
      </div>
    </section>
  );
}
