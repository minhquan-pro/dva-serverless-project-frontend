import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { SHOP_INFO } from "../data/shopInfo";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const NAV_LINKS = [
  { to: "/thuc-don", label: "Thực đơn" },
  { to: "/dat-ban-truoc", label: "Đặt bàn" },
  { to: "/gioi-thieu", label: "Giới thiệu" },
  { to: "/lien-he", label: "Liên hệ" },
];

const NAV_LINK_CLASS = ({ isActive }: { isActive: boolean }) =>
  `px-5 py-2.5 font-display text-xs font-extrabold uppercase tracking-wide transition-colors ${
    isActive ? "bg-ink text-paper" : "text-ink hover:bg-paper-deep"
  }`;

const MOBILE_NAV_LINK_CLASS = ({ isActive }: { isActive: boolean }) =>
  `border-b border-grid px-7 py-3 font-display text-sm font-extrabold uppercase tracking-wide ${
    isActive ? "bg-paper-deep text-red" : "text-ink hover:bg-paper-deep"
  }`;

function CartButton() {
  const { totalItems, openDrawer } = useCart();

  return (
    <button
      type="button"
      onClick={openDrawer}
      aria-label={`Mở giỏ hàng${totalItems > 0 ? `, ${totalItems} món` : ""}`}
      className="relative flex h-11 w-11 flex-shrink-0 items-center justify-center border-[1.5px] border-ink bg-paper hover:bg-paper-deep"
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-ink">
        <circle cx="9" cy="20" r="1.4" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="18" cy="20" r="1.4" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M2 3h2l2.4 12.2a2 2 0 002 1.8h8.6a2 2 0 002-1.6L21 8H6"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
      {totalItems > 0 && (
        <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center border-[1.5px] border-paper bg-red font-display text-[0.65rem] font-extrabold tabular-nums text-paper">
          {totalItems}
        </span>
      )}
    </button>
  );
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <div className="border-b-[3px] border-ink">
      <div className="flex justify-between border-b border-grid px-6 py-2 font-display text-xs font-bold uppercase tracking-wide text-ink/60 sm:px-7">
        <span>Ấn bản mỗi sáng</span>
        <span className="tabular-nums">{SHOP_INFO.openingHours.split(" ")[0]}</span>
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-5 sm:px-7">
        <Link to="/" className="font-display text-2xl font-extrabold uppercase tracking-tight text-ink">
          Nhà Mình <span className="text-red">Ăn Sáng</span>
        </Link>

        <div className="flex items-center gap-3 sm:gap-5">
          <div className="hidden items-center gap-5 md:flex">
            <nav className="flex divide-x-[1.5px] divide-ink border-[1.5px] border-ink">
              {NAV_LINKS.map((link) => (
                <NavLink key={link.to} to={link.to} className={NAV_LINK_CLASS}>
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {isAuthenticated ? (
              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wide">
                <Link to="/tai-khoan" className="text-ink hover:text-red">
                  Xin chào, {user?.name.split(" ").at(-1)}
                </Link>
                <button type="button" onClick={logout} className="text-ink/50 hover:text-red">
                  Đăng xuất
                </button>
              </div>
            ) : (
              <Link
                to="/dang-nhap"
                className="text-xs font-bold uppercase tracking-wide text-ink hover:text-red"
              >
                Đăng nhập
              </Link>
            )}
          </div>

          <CartButton />

          <button
            type="button"
            className="border-[1.5px] border-ink bg-paper px-3 py-2 text-lg md:hidden"
            aria-label="Mở menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav className="flex flex-col border-t-[1.5px] border-ink md:hidden">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className={MOBILE_NAV_LINK_CLASS} onClick={() => setIsMenuOpen(false)}>
              {link.label}
            </NavLink>
          ))}
          {isAuthenticated ? (
            <>
              <NavLink to="/tai-khoan" className={MOBILE_NAV_LINK_CLASS} onClick={() => setIsMenuOpen(false)}>
                Tài khoản ({user?.name.split(" ").at(-1)})
              </NavLink>
              <button
                type="button"
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
                className="border-b border-grid px-7 py-3 text-left font-display text-sm font-extrabold uppercase tracking-wide text-ink hover:bg-paper-deep"
              >
                Đăng xuất
              </button>
            </>
          ) : (
            <NavLink to="/dang-nhap" className={MOBILE_NAV_LINK_CLASS} onClick={() => setIsMenuOpen(false)}>
              Đăng nhập
            </NavLink>
          )}
        </nav>
      )}
    </div>
  );
}
