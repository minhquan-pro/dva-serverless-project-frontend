import { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SectionHeading } from "../components/SectionHeading";
import { Button } from "../components/Button";
import { AuthTabs } from "../components/AuthTabs";
import { AuthMeta } from "../components/AuthMeta";
import { useAuth } from "../context/AuthContext";

type SubmitStatus = "idle" | "loading" | "error";

const INPUT_CLASS =
  "w-full border-0 border-b-[1.5px] border-grid bg-transparent px-0 py-2 font-medium text-ink outline-none focus:border-red";

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function validate(): string | null {
    if (!/^[0-9+\s]{8,15}$/.test(phone.trim())) return "Số điện thoại không hợp lệ";
    if (!password) return "Vui lòng nhập mật khẩu";
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
      await login({ phone: phone.trim(), password });
      const redirectTo = (location.state as { from?: string } | null)?.from ?? "/tai-khoan";
      navigate(redirectTo, { replace: true });
    } catch {
      setStatus("error");
      setErrorMessage("Số điện thoại hoặc mật khẩu không đúng.");
    }
  }

  return (
    <section className="px-6 py-16 sm:px-7 sm:py-20">
      <div className="mx-auto max-w-md">
        <span className="mb-6 inline-block border-[1.5px] border-red px-3.5 py-1 font-display text-xs font-extrabold uppercase tracking-wide text-red">
          Thành viên · Quán nhà
        </span>

        <AuthTabs />

        <SectionHeading title="Đăng nhập" description="Nhập số điện thoại và mật khẩu để tiếp tục." />

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
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

          <Button type="submit" disabled={status === "loading"} className="mt-2 justify-center">
            {status === "loading" ? "Đang đăng nhập..." : "Đăng nhập"}
          </Button>

          {status === "error" && <p className="text-sm font-bold text-red">{errorMessage}</p>}
        </form>

        <p className="mt-7 text-sm font-medium text-ink/70">
          Chưa có tài khoản?{" "}
          <Link to="/dang-ky" className="font-bold text-red underline underline-offset-2">
            Đăng ký ngay
          </Link>
        </p>

        <AuthMeta />
      </div>
    </section>
  );
}
