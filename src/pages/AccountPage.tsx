import { SectionHeading } from "../components/SectionHeading";
import { Button } from "../components/Button";
import { useAuth } from "../context/AuthContext";

export function AccountPage() {
  const { user, logout } = useAuth();

  return (
    <section className="px-6 py-16 sm:px-7 sm:py-20">
      <div className="mx-auto max-w-2xl">
        <SectionHeading title="Tài khoản của tôi" />

        <div className="grid grid-cols-1 gap-0 border-[1.5px] border-ink sm:grid-cols-2">
          <div className="border-b-[1.5px] border-ink p-6 sm:border-b-0 sm:border-r-[1.5px]">
            <span className="block text-xs font-bold uppercase tracking-wide text-ink/50">Họ tên</span>
            <span className="mt-1.5 block text-lg font-bold text-ink">{user?.name}</span>
          </div>
          <div className="p-6">
            <span className="block text-xs font-bold uppercase tracking-wide text-ink/50">Số điện thoại</span>
            <span className="mt-1.5 block text-lg font-bold text-ink">{user?.phone}</span>
          </div>
        </div>

        <p className="mt-8 max-w-[56ch] font-medium leading-relaxed text-ink/65">
          Tính năng đặt món online và lịch sử đơn hàng sẽ sớm ra mắt — tài khoản của bạn đã sẵn sàng cho ngày đó.
        </p>

        <Button variant="line" onClick={logout} className="mt-8">
          Đăng xuất
        </Button>
      </div>
    </section>
  );
}
