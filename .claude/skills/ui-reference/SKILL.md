---
name: ui-reference
description: Tham khảo pattern giao diện chuyên nghiệp cho website bán đồ ăn/nhà hàng khi xây dựng section hoặc trang mới bằng React + Tailwind + Axios. Dùng khi cần bố cục Hero, Menu, About, Testimonial, Contact/Order, hoặc cấu trúc thư mục/tooling chuẩn cho dự án Vite+React+Tailwind.
---

# UI Reference — Food/Restaurant Frontend

Tổng hợp pattern từ các repo React + Tailwind chuyên về nhà hàng/đồ ăn trên GitHub. Dùng để THAM KHẢO bố cục và cấu trúc — không copy nguyên code, viết lại cho phù hợp thương hiệu quán (bánh cuốn, bún chả).

## Nguồn tham khảo
- **themixlyweb/react-restaurant-website-template** — one-page React + Tailwind + Vite cho nhà hàng/quán ăn: Hero, About, Menu, Chefs, Contact.
- **joaopaulomoraes/reactjs-vite-tailwindcss-boilerplate** — cấu trúc chuẩn Vite + React 18 + TypeScript + Tailwind 3 + ESLint + Prettier + Vitest/Testing Library, có `.editorconfig`, issue templates.
- **arnobt78/Restaurant-Food-Ordering-Management-System** (MERN) — tham khảo luồng đặt món/giỏ hàng/theo dõi đơn hàng full-stack nếu sau này quán cần đặt món online thay vì chỉ trang giới thiệu.

## Bố cục trang chủ khuyến nghị
1. **Header** — logo, tên quán, nav (Trang chủ / Thực đơn / Giới thiệu / Liên hệ), nút CTA (Đặt hàng / Gọi ngay).
2. **Hero** — ảnh món ăn nổi bật (bánh cuốn, bún chả), tagline, CTA chính, giờ mở cửa/địa chỉ rút gọn.
3. **Menu** — danh sách món theo nhóm (Bánh cuốn / Bún chả / Đồ uống / Món thêm), ảnh + tên + giá, có thể có tab lọc theo nhóm.
4. **About** — câu chuyện quán, điểm khác biệt (nguyên liệu, công thức gia truyền, thời gian mở bán...).
5. **Testimonials** (tuỳ chọn) — đánh giá/phản hồi khách hàng.
6. **Contact / Order** — form liên hệ hoặc đặt món, địa chỉ, bản đồ, giờ mở cửa, mạng xã hội/Zalo.
7. **Footer** — thông tin liên hệ, mạng xã hội, bản quyền.

## Quy ước component
- Mỗi section lớn = 1 component trong `src/sections/`, nhận dữ liệu qua props hoặc import từ `src/data/`.
- Ảnh món ăn: `aspect-ratio` cố định (vd `aspect-[4/3]`), `object-cover`, lazy-load (`loading="lazy"`), `alt` mô tả món.
- Nút CTA chính dùng một màu nhấn nhất quán, định nghĩa trong `tailwind.config.js` (`theme.extend.colors`), không hardcode mã hex rải rác trong component.
- Input/form cần label rõ ràng và trạng thái lỗi hiển thị inline (tham khảo pattern validate trong `index.html` cũ của repo: đếm ký tự, viền đỏ khi lỗi, thông báo lỗi dưới input).

## Khi gọi API (đặt món / liên hệ)
- Dùng chung một axios instance ở `src/services/api.ts` với `baseURL` từ `import.meta.env.VITE_API_URL`.
- Mỗi nhóm chức năng có 1 file service riêng (vd `services/orderService.ts`) export các hàm gọi API, không gọi axios trực tiếp trong component.
- Hiển thị rõ 3 trạng thái: đang gửi (loading, disable nút), thành công (thông báo xanh), lỗi (thông báo đỏ + message cụ thể) — theo đúng pattern try/catch/finally đã có sẵn trong `index.html` cũ.

## Tooling khuyến nghị khi scaffold dự án
- Vite + React + TypeScript làm nền, thêm Tailwind CSS qua PostCSS.
- ESLint + Prettier + EditorConfig để đồng bộ code style.
- (Tuỳ chọn) Vitest + Testing Library nếu cần test component.
