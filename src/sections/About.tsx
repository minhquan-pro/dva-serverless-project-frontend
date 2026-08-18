import { SectionHeading } from "../components/SectionHeading";
import { SHOP_INFO } from "../data/shopInfo";

const STATS = [
  { value: "3", label: "Đời truyền công thức" },
  { value: "100%", label: "Than hoa thật" },
  { value: "7", label: "Món trong thực đơn" },
  { value: SHOP_INFO.openingHours.split(" ")[0], label: "Mở cửa mỗi sáng" },
];

export function About() {
  return (
    <section id="gioi-thieu" className="border-b-[3px] border-ink px-6 py-16 sm:px-7 sm:py-20">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-14 md:grid-cols-2">
        <div>
          <SectionHeading index="02" title="Giới thiệu" />
          <p className="text-base font-medium leading-relaxed text-ink/65 sm:text-lg">
            Quán bắt đầu từ gánh hàng nhỏ ở góc chợ, nay vẫn giữ đúng công thức nước chấm gia truyền và cách tráng
            bánh cuốn tay từng lớp mỏng.
          </p>
          <p className="mt-4 text-base font-medium leading-relaxed text-ink/65 sm:text-lg">
            Không vội, không công nghiệp — chỉ đủ cho một buổi sáng bắt đầu tử tế.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-0 border-[1.5px] border-ink">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`p-6 ${i % 2 === 0 ? "border-r-[1.5px]" : ""} ${i < 2 ? "border-b-[1.5px]" : ""} border-ink`}
            >
              <strong className="block font-display text-4xl font-extrabold text-ink">{stat.value}</strong>
              <span className="mt-2 block text-xs font-bold uppercase tracking-wide text-ink/60">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
