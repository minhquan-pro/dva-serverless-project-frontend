import { NavLink } from "react-router-dom";

const TAB_CLASS = ({ isActive }: { isActive: boolean }) =>
  `flex-1 px-0 py-3 text-center font-display text-xs font-extrabold uppercase tracking-wide transition-colors ${
    isActive ? "bg-ink text-paper" : "text-ink hover:bg-paper-deep"
  }`;

export function AuthTabs() {
  return (
    <div className="mb-8 flex divide-x-[1.5px] divide-ink border-[1.5px] border-ink">
      <NavLink to="/dang-nhap" className={TAB_CLASS}>
        Đăng nhập
      </NavLink>
      <NavLink to="/dang-ky" className={TAB_CLASS}>
        Đăng ký
      </NavLink>
    </div>
  );
}
