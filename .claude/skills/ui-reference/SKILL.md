---
name: ui-reference
description: Hệ thống thiết kế "Ấn Bản Sáng" đã chốt cho website bán đồ ăn (bánh cuốn, bún chả) — dùng khi xây dựng section/trang/component mới bằng React + Tailwind để giữ đúng màu sắc, font, hình khối đã thống nhất với chủ shop.
---

# UI Reference — "Ấn Bản Sáng" Design System

Đây là hệ thống thiết kế ĐÃ CHỐT (chọn sau khi xem 9 phương án brainstorm, lấy cảm hứng từ poster in ấn/báo cũ) — không phải gợi ý chung chung. Mọi section/trang mới nên theo đúng token dưới đây để giao diện nhất quán. Nếu chủ shop muốn đổi hướng thiết kế khác, dùng skill `brainstorming` trước, sau đó cập nhật lại file này và `CLAUDE.md`.

## Token màu (định nghĩa tại `src/index.css` qua `@theme`)
| Token | Hex | Vai trò |
|---|---|---|
| `ink` | `#1b1b18` | Chữ chính, viền, nền tối (section Thực đơn/Liên hệ) |
| `paper` | `#f2ecdd` | Nền chính (giấy) |
| `paper-deep` | `#ece3cd` | Nền phụ, hover state |
| `red` | `#b4302a` | Màu nhấn DUY NHẤT — giá tiền, CTA chính, số thứ tự `§ 0X` |
| `grid` | `#c9c2ac` | Viền mảnh (hairline) giữa các dòng/item |

Dùng trực tiếp qua class Tailwind: `bg-ink`, `text-red`, `border-grid`, v.v. — không hardcode mã hex trong component. Chỉ dùng `red` làm điểm nhấn — không thêm màu thứ 3, thứ 4.

## Font
- CHỈ một họ chữ: **Archivo** — dùng nhiều độ đậm (400 → 900) thay vì phối 2 font khác nhau.
- `h1`/`h2`/`h3` mặc định: `font-weight: 900`, `text-transform: uppercase`, `letter-spacing: -0.01em` (đã set trong `src/index.css`, không cần lặp lại trong component).
- Body/label dùng `font-sans` (cũng là Archivo) ở weight thường/đậm vừa.

## Ngôn ngữ hình khối
- KHÔNG bo góc — đây là thiết kế poster/in ấn, mọi thứ vuông vức (`border-*`, không `rounded-*`).
- Viền mảnh `border-[1.5px]` để phân chia nav/tag/filter; viền dày `border-[3px] border-ink` để ngăn section lớn.
- Hairline rule (`h-px bg-ink` hoặc `bg-paper/35` trên nền tối) kéo dài cạnh tiêu đề section — xem `SectionHeading`.
- Số thứ tự đỏ kiểu mục lục (`§ 01`, `§ 02`, `§ 03`) đặt trước tiêu đề mỗi section lớn — CHỈ dùng cách này cho 3 section chính đã có thứ tự cố định (Thực đơn/Giới thiệu/Liên hệ); không lạm dụng đánh số cho nội dung không có trình tự thật.
- Chữ viền rỗng (`-webkit-text-stroke`) dùng cho từ khoá nổi bật trong hero — hiệu ứng poster hai lớp chữ đặc/rỗng.
- Không dùng icon/emoji trang trí — thực đơn và thông tin chỉ dùng typographic, không ảnh chụp món ăn ở giai đoạn này.

## Bố cục các section (đã áp dụng, dùng làm mẫu khi thêm section mới)
1. **Header** — dải thông tin nhỏ phía trên (giờ mở cửa), logo chữ hoa đậm (chữ "Ăn Sáng" tô đỏ), nav dạng khối viền có gạch chia (`divide-x`).
2. **Hero** — tag viền đỏ nhỏ phía trên, tiêu đề khổng lồ 2 dòng (dòng 2 dùng chữ viền rỗng), hairline rule ngăn cách với đoạn mô tả + nút CTA.
3. **Menu** (§01) — nhóm nút lọc dạng khối viền liền nhau, danh sách món đánh số (`MenuRow`) — không phải lưới card.
4. **About** (§02) — 2 cột: đoạn văn bên trái, lưới 2×2 chỉ số thống kê có viền bên phải.
5. **Contact** (§03) — nền `bg-ink` tối, thông tin dạng label/value, input chỉ có viền dưới (underline), nút submit đỏ vuông vức.
6. **Footer** — 2 dòng đơn giản, chữ hoa nhỏ, canh 2 đầu.

## Component dùng chung
- `Button` (`src/components/Button.tsx`) — biến thể `solid` (nền ink), `line` (viền, nền trong suốt), `red` (viền/nền đỏ). Không bo góc, chữ hoa, tracking rộng.
- `SectionHeading` (`src/components/SectionHeading.tsx`) — nhận `index` (số thứ tự dạng chuỗi, vd `"01"`), `title`, `description?`, `tone` (`light`/`dark`).
- `MenuRow` (`src/components/MenuRow.tsx`) — 1 dòng thực đơn: số thứ tự + tên/mô tả + giá, dùng trong danh sách thay vì card.

## Khi gọi API (liên hệ/đặt món)
- Dùng chung axios instance ở `src/services/api.ts` với `baseURL` từ `import.meta.env.VITE_API_URL`.
- Mỗi nhóm chức năng có 1 file service riêng, không gọi axios trực tiếp trong component.
- Hiển thị rõ 3 trạng thái loading/success/error — xem mẫu trong `src/sections/Contact.tsx`.
