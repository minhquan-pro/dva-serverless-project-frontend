import { SectionHeading } from "../components/SectionHeading";
import { SHOP_INFO } from "../data/shopInfo";

const HIGHLIGHTS = [
  { title: "Nguyên liệu tươi mỗi ngày", description: "Bột bánh cuốn tráng tay, thịt và rau chọn lọc mỗi sáng." },
  { title: "Công thức gia truyền", description: "Nước chấm pha theo bí quyết riêng, đậm đà đúng vị." },
  { title: "Phục vụ nhanh, sạch sẽ", description: "Không gian gọn gàng, phù hợp ăn tại chỗ hoặc mang đi." },
];

export function About() {
  return (
    <section id="gioi-thieu" className="bg-brand-50 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Giới thiệu"
          title={`Về ${SHOP_INFO.name}`}
          description="Quán ăn sáng gia đình, giữ vị truyền thống trong từng món bánh cuốn, bún chả."
        />

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {HIGHLIGHTS.map((item) => (
            <div key={item.title} className="rounded-2xl bg-white p-6 text-center shadow-sm">
              <h3 className="font-semibold text-brand-900">{item.title}</h3>
              <p className="mt-2 text-sm text-brand-700">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
