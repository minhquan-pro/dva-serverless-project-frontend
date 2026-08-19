import { useState, type FormEvent } from "react";
import { Button } from "../components/Button";
import { useAuth } from "../context/AuthContext";

const INPUT_CLASS =
  "w-full resize-none border-0 border-b-[1.5px] border-grid bg-transparent px-0 py-2 font-medium text-ink outline-none focus:border-red";

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function AccountPage() {
  const { user, updateProfile, logout } = useAuth();
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [address, setAddress] = useState(user?.address ?? "");
  const [saved, setSaved] = useState(false);

  if (!user) return null;

  function handleSave(event: FormEvent) {
    event.preventDefault();
    updateProfile({ phone: phone.trim(), address: address.trim() });
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  }

  return (
    <section className="px-6 py-16 sm:px-7 sm:py-20">
      <div className="mx-auto max-w-md">
        <span className="mb-6 inline-block border-[1.5px] border-red px-3.5 py-1 font-display text-xs font-extrabold uppercase tracking-wide text-red">
          Tài khoản của tôi
        </span>

        <div className="mb-6.5 flex items-center gap-4.5 border-b-[1.5px] border-ink pb-6.5">
          <div className="flex h-[72px] w-[72px] flex-shrink-0 items-center justify-center overflow-hidden border-[1.5px] border-ink bg-paper-deep font-display text-xl font-extrabold text-ink">
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.name} className="h-full w-full object-cover" />
            ) : (
              getInitials(user.name)
            )}
          </div>
          <div>
            <h1 className="mb-1 text-xl normal-case">{user.name}</h1>
            <p className="text-sm font-semibold text-ink/55">{user.email}</p>
            <p className="mt-2 inline-flex items-center gap-1.5 text-[0.68rem] font-extrabold uppercase tracking-wide text-ink/45">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 flex-shrink-0">
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
              Đăng nhập bằng Google
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="flex flex-col gap-5">
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
            <label htmlFor="address" className="mb-2 block text-xs font-bold uppercase tracking-wide text-ink/60">
              Địa chỉ giao hàng
            </label>
            <textarea
              id="address"
              rows={2}
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              className={INPUT_CLASS}
            />
          </div>

          <div className="mt-1 flex items-center gap-4.5">
            <Button type="submit">Lưu thông tin</Button>
            {saved && <span className="text-sm font-bold text-red">Đã lưu.</span>}
          </div>
        </form>

        <div className="mt-8.5 border-t border-grid pt-5.5">
          <Button type="button" variant="line" onClick={logout}>
            Đăng xuất
          </Button>
        </div>
      </div>
    </section>
  );
}
