---
name: ui-reference
description: Hệ thống thiết kế "Phố Ẩm Thực" đã chốt cho website bán đồ ăn (bánh cuốn, bún chả) — dùng khi xây dựng section/trang/component mới bằng React + Tailwind để giữ đúng màu sắc, font, hình khối đã thống nhất với chủ shop.
---

# UI Reference — "Phố Ẩm Thực" Design System

Đây là hệ thống thiết kế ĐÃ CHỐT (chọn từ 3 phương án brainstorm ngày trước) — không phải gợi ý chung chung. Mọi section/trang mới nên theo đúng token dưới đây để giao diện nhất quán. Nếu chủ shop muốn đổi hướng thiết kế khác, dùng skill `brainstorming` trước, sau đó cập nhật lại file này và `CLAUDE.md`.

## Token màu (định nghĩa tại `src/index.css` qua `@theme`)
| Token | Hex | Vai trò |
|---|---|---|
| `ink` | `#241505` | Chữ chính, viền (border dày 2.5–3px) |
| `cream` | `#fff4e3` | Nền chính |
| `cream-deep` | `#ffeccb` | Gradient nền hero |
| `card` | `#fffaf0` | Nền card/form |
| `red` / `red-deep` | `#e14434` / `#b52f22` | Màu chủ đạo — CTA chính, section liên hệ |
| `green` | `#2f6b4f` | Phụ — nav CTA, badge |
| `yellow` | `#f4b400` | Phụ — tag, stat chip, icon nền |

Dùng trực tiếp qua class Tailwind: `bg-red`, `text-ink`, `border-ink`, v.v. — không hardcode mã hex trong component.

## Font
- `font-display` → Baloo 2 (tiêu đề, nút, badge — bo tròn, đậm).
- `font-sans` (mặc định `body`) → Nunito (nội dung, mô tả).
- Cả hai load qua Google Fonts trong `index.html`.

## Ngôn ngữ hình khối
- Viền dày `border-[2.5px]` hoặc `border-[3px] border-ink` trên hầu hết card/button/badge.
- Bo tròn lớn: `rounded-full` cho pill/button/badge tròn, `rounded-2xl`/`rounded-3xl` cho card/khối lớn.
- Đổ bóng kiểu sticker (hard shadow, không blur): `shadow-[4px_4px_0_var(--color-ink)]`, hover thu nhỏ còn `shadow-[2px_2px_0_var(--color-ink)]` kèm dịch chuyển nhẹ — tạo cảm giác nhấn nút thật.
- Badge/tag giá xoay nghiêng nhẹ: `rotate-2`, `-rotate-2`, `rotate-6` — tạo cảm giác tem dán tay, tránh mọi thứ đều thẳng hàng cứng nhắc.
- Icon món ăn dùng emoji tròn nền màu theo nhóm (xem `MENU_CATEGORIES` trong `src/data/menu.ts`) thay cho ảnh chụp — quán chưa có ảnh thật, ưu tiên đồ hoạ/icon phẳng hơn là placeholder ảnh xám.

## Bố cục các section (đã áp dụng, dùng làm mẫu khi thêm section mới)
1. **Header** — sticky, viền dưới dày, logo có badge tròn emoji, nav pill, CTA nav màu `green`.
2. **Hero** — nền gradient `cream → cream-deep`, badge pill thông tin nhanh (giờ mở cửa, địa chỉ), tiêu đề có từ khoá nổi bật trong khối `bg-red` xoay nghiêng, khối "tem tròn" (stamp) bên phải với 2 chip nổi, đường chéo `clip-path` ngăn cách hero với section sau.
3. **Menu** — nền `bg-ink` (tối, tương phản với hero), tab lọc pill, card `bg-card` viền dày với icon tròn + tag giá nổi góc trên bo xoay nhẹ.
4. **About** — 2 cột: khối minh hoạ màu `green` bo lớn đổ bóng cứng + nội dung kèm dãy "stat chip" màu `yellow`.
5. **Contact** — nền `bg-red`, card `bg-card` viền dày đổ bóng lớn, input bo `rounded-xl` viền dày, nút submit dùng biến thể `dark` (nền `ink`, chữ `yellow`).
6. **Footer** — nền `ink`, chữ `cream`, đơn giản.

## Component dùng chung
- `Button` (`src/components/Button.tsx`) — biến thể `primary` (đỏ), `secondary` (trắng), `accent` (xanh lá, dùng cho nav CTA), `dark` (nền ink/chữ vàng, dùng cho submit form).
- `SectionHeading` (`src/components/SectionHeading.tsx`) — kicker dạng pill + tiêu đề Baloo 2, có `tone="light"` (nền sáng) và `tone="dark"` (nền tối như section Menu/Contact).

## Khi gọi API (liên hệ/đặt món)
- Dùng chung axios instance ở `src/services/api.ts` với `baseURL` từ `import.meta.env.VITE_API_URL`.
- Mỗi nhóm chức năng có 1 file service riêng, không gọi axios trực tiếp trong component.
- Hiển thị rõ 3 trạng thái loading/success/error — xem mẫu trong `src/sections/Contact.tsx`.
