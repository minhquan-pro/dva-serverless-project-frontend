import { useState } from "react";
import { SectionHeading } from "../components/SectionHeading";
import { ReservationModal } from "../components/ReservationModal";
import { Button } from "../components/Button";

export function ReservationPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="px-6 py-16 sm:px-7 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <span className="mb-6 inline-block border-[1.5px] border-red px-3.5 py-1 font-display text-xs font-extrabold uppercase tracking-wide text-red">
          Đặt bàn trước
        </span>

        <SectionHeading
          title="Giữ chỗ cho bữa sáng"
          description="Chọn ngày, khung giờ và số người — quán sẽ xác nhận qua điện thoại."
        />

        <div className="flex flex-col items-start gap-5 border-[1.5px] border-ink p-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-1.5 text-lg font-extrabold text-ink">Đặt bàn nhanh</p>
            <p className="font-medium text-ink/60">Chỉ mất 30 giây, quán xác nhận lại ngay sau đó.</p>
          </div>
          <Button type="button" onClick={() => setIsModalOpen(true)}>
            Đặt bàn ngay
          </Button>
        </div>
      </div>

      <ReservationModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
