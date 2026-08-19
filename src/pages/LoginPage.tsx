import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SectionHeading } from "../components/SectionHeading";
import { AuthMeta } from "../components/AuthMeta";
import { useAuth } from "../context/AuthContext";

type Status = "idle" | "loading" | "error";

export function LoginPage() {
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [status, setStatus] = useState<Status>("idle");

  async function handleGoogleLogin() {
    setStatus("loading");
    try {
      await loginWithGoogle();
      const redirectTo = (location.state as { from?: string } | null)?.from ?? "/tai-khoan";
      navigate(redirectTo, { replace: true });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="px-6 py-16 sm:px-7 sm:py-20">
      <div className="mx-auto max-w-md">
        <span className="mb-6 inline-block border-[1.5px] border-red px-3.5 py-1 font-display text-xs font-extrabold uppercase tracking-wide text-red">
          Thành viên · Quán nhà
        </span>

        <SectionHeading
          title="Đăng nhập"
          description="Đăng nhập bằng Google để lưu thông tin giao hàng cho lần đặt món tiếp theo."
        />

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={status === "loading"}
          className="flex w-full items-center justify-center gap-3 border-[1.5px] border-ink bg-paper py-3.5 font-display text-sm font-extrabold uppercase tracking-wide text-ink transition-colors hover:bg-paper-deep disabled:cursor-not-allowed disabled:opacity-60"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 flex-shrink-0">
            <path
              fill="#4285F4"
              d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.4-1.1 2.6-2.4 3.4v2.9h3.9c2.3-2.1 3.5-5.2 3.5-8.5z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.2 0 6-1.1 7.9-2.9l-3.9-2.9c-1.1.7-2.4 1.1-4 1.1-3.1 0-5.7-2.1-6.6-4.9H1.4v3C3.3 21.3 7.3 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.4 14.4c-.2-.7-.4-1.5-.4-2.4s.1-1.6.4-2.4V6.6H1.4C.5 8.3 0 10.1 0 12s.5 3.7 1.4 5.4l4-3z"
            />
            <path
              fill="#EA4335"
              d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4C18 1.2 15.2 0 12 0 7.3 0 3.3 2.7 1.4 6.6l4 3.1c.9-2.8 3.5-4.9 6.6-4.9z"
            />
          </svg>
          {status === "loading" ? "Đang đăng nhập..." : "Đăng nhập với Google"}
        </button>

        {status === "error" && (
          <p className="mt-4 text-sm font-bold text-red">Đăng nhập thất bại, vui lòng thử lại.</p>
        )}

        <AuthMeta />
      </div>
    </section>
  );
}
