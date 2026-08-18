# Breakfast Shop Frontend — Project Rules

## Bối cảnh dự án
Frontend cho website bán đồ ăn sáng của nhà (bánh cuốn, bún chả, ...). Đây là phần frontend của "dva-serverless-project" — backend dự kiến là AWS serverless (API Gateway + Lambda), giao tiếp qua REST API bằng Axios. Dự án đã được scaffold (Vite + React + TypeScript + Tailwind v4 + Axios), one-page, có form liên hệ (chưa có giỏ hàng/đặt món online).

## Nhận diện thiết kế đã chốt: "Phố Ẩm Thực"
Sau khi brainstorm 3 phương án giao diện, chủ shop đã chọn hướng **sôi động kiểu quán vỉa hè** — đây là hệ thống thiết kế chính thức, ưu tiên áp dụng cho mọi trang/section mới:
- **Màu** (định nghĩa trong `src/index.css` qua `@theme`): `ink` #241505 (chữ/viền chính), `cream` #fff4e3 (nền), `cream-deep` #ffeccb (gradient nền hero), `card` #fffaf0 (nền card), `red`/`red-deep` (màu chủ đạo CTA), `green` (phụ, badge/nav CTA), `yellow` (phụ, tag/stat chip).
- **Font**: `font-display` = Baloo 2 (tiêu đề, bo tròn, đậm) — `font-sans` = Nunito (nội dung). Load qua Google Fonts trong `index.html`.
- **Hình khối đặc trưng**: viền dày `border-[2.5px]`/`border-[3px] border-ink`, bo tròn lớn (`rounded-full`, `rounded-2xl`/`rounded-3xl`), đổ bóng "hard shadow" kiểu stickers (`shadow-[Npx_Npx_0_var(--color-ink)]`), tag giá dạng badge xoay nghiêng (`rotate-2`/`-rotate-2`).
- **Không dùng ảnh món ăn thật dạng photo** ở giai đoạn này — dùng icon emoji đại diện món (xem `src/data/menu.ts`), thay ảnh thật bằng photo khi quán có ảnh chụp đẹp và cần nâng cấp lên phiên bản polish hơn.
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
