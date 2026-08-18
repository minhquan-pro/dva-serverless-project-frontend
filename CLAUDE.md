# Breakfast Shop Frontend — Project Rules

## Bối cảnh dự án
Frontend cho website bán đồ ăn sáng của nhà (bánh cuốn, bún chả, ...). Đây là phần frontend của "dva-serverless-project" — backend dự kiến là AWS serverless (API Gateway + Lambda), giao tiếp qua REST API bằng Axios. Dự án đã được scaffold (Vite + React + TypeScript + Tailwind v4 + Axios), one-page, có form liên hệ (chưa có giỏ hàng/đặt món online).

## Nhận diện thiết kế đã chốt: "Ấn Bản Sáng"
Sau khi brainstorm và xem qua 9 phương án giao diện (bao gồm cả "Phố Ẩm Thực" từng áp dụng trước đó), chủ shop đã chọn hướng **poster in ấn/báo cũ táo bạo** — đây là hệ thống thiết kế chính thức, ưu tiên áp dụng cho mọi trang/section mới:
- **Màu** (định nghĩa trong `src/index.css` qua `@theme`): `ink` #1b1b18 (chữ/viền/nền tối), `paper` #f2ecdd (nền giấy chính), `paper-deep` #ece3cd (nền phụ/hover), `red` #b4302a (màu nhấn duy nhất — dùng cho giá, CTA, số thứ tự section), `grid` #c9c2ac (viền mảnh/hairline).
- **Font**: chỉ MỘT họ chữ — Archivo, dùng ở nhiều độ đậm (400 → 900). Tiêu đề (`h1`/`h2`/`h3`) mặc định `font-weight: 900`, `uppercase`, `letter-spacing: -0.01em` (đã set sẵn trong `src/index.css`). Load qua Google Fonts trong `index.html`.
- **Hình khối đặc trưng**: KHÔNG bo góc (poster/print, không `rounded-*`), viền mảnh `border-[1.5px]`/dày `border-[3px] border-ink` phân tách section, hairline rule (`h-px bg-ink`) kéo dài bên cạnh tiêu đề, số thứ tự đỏ kiểu mục lục (`§ 01`, `§ 02`...) — chỉ dùng số khi nội dung thực sự có thứ tự (3 section chính: Thực đơn/Giới thiệu/Liên hệ).
- **Thực đơn trình bày dạng danh sách đánh số** (xem `src/components/MenuRow.tsx`) — không phải card ảnh — số thứ tự (`01`, `02`...) + tên món + mô tả + giá canh phải, giống một ấn phẩm in, không dùng icon/emoji trang trí.
- **Không dùng ảnh món ăn thật dạng photo** ở giai đoạn này — thiết kế thuần typographic. Nếu sau này quán muốn thêm ảnh, cân nhắc đổi hướng thiết kế khác phù hợp hơn với ảnh chụp.
- Style này được coi là baseline — nếu đổi hướng thiết kế khác, cập nhật lại mục này.

## Tech stack
- React 18 + Vite + TypeScript
- Tailwind CSS v4 (utility-first, mobile-first, theme định nghĩa qua `@theme` trong `src/index.css`)
- Axios cho gọi API
- React Router nếu có nhiều trang/route
- ESLint (oxlint) cho chất lượng code

## Cấu trúc thư mục (khi scaffold)
```
src/
  assets/        # ảnh, icon, font
  components/    # component dùng chung (Button, Card, Header, Footer...)
  sections/      # các block lớn của trang (Hero, Menu, About, Testimonials, Contact)
  pages/         # từng route/trang
  hooks/         # custom hooks
  services/      # axios instance + API calls (services/api.ts, services/orderService.ts...)
  types/         # TypeScript types/interfaces
  utils/         # hàm tiện ích
  data/          # dữ liệu tĩnh (menu, ảnh, thông tin quán) khi chưa có API
```

## Quy ước code
- Component: PascalCase, một component chính mỗi file, functional component + hooks.
- Style: chỉ dùng Tailwind utility classes; tránh CSS thuần trừ khi thực sự cần (animation phức tạp...).
- Màu sắc/thương hiệu định nghĩa tập trung trong `@theme` của `src/index.css`, không hardcode mã màu rải rác trong component.
- Mọi gọi mạng đi qua `src/services/`, không gọi axios trực tiếp trong component.
- Base URL API lấy từ biến môi trường `import.meta.env.VITE_API_URL`, không hardcode.
- Text hiển thị cho người dùng (UI) dùng tiếng Việt có dấu; tên biến/hàm, comment dùng tiếng Anh.
- Thiết kế mobile-first, kiểm tra tối thiểu 3 breakpoint (mobile / tablet / desktop).
- Nếu sau này dùng ảnh món ăn thật, dùng `aspect-ratio` cố định + `object-cover`, có `alt` mô tả món ăn (accessibility).
- Trạng thái loading/error/success của mọi thao tác gọi API phải hiển thị rõ cho người dùng.

## Quy trình làm việc
- Trước khi tạo trang/tính năng mới (hoặc đổi bố cục lớn) → dùng skill `brainstorming` để chốt phạm vi với chủ shop trước khi code.
- Khi xây section/trang mới, tham khảo skill `ui-reference` để theo đúng pattern của website bán đồ ăn chuyên nghiệp.
- Không tự ý thêm thư viện/kiến trúc mới (state management, CMS, thanh toán...) mà chưa hỏi qua brainstorming.
