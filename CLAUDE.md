# Breakfast Shop Frontend — Project Rules

## Bối cảnh dự án
Frontend cho website bán đồ ăn sáng của nhà (bánh cuốn, bún chả, ...). Đây là phần frontend của "dva-serverless-project" — backend dự kiến là AWS serverless (API Gateway + Lambda), giao tiếp qua REST API bằng Axios. File `index.html` hiện tại là tàn dư của một dự án khác (form đăng ký sự kiện AWS) — sẽ được thay thế khi scaffold dự án React thật.

## Tech stack
- React 18 + Vite + TypeScript
- Tailwind CSS (utility-first, mobile-first)
- Axios cho gọi API
- React Router nếu có nhiều trang/route
- ESLint + Prettier cho chất lượng code

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
- Màu sắc/thương hiệu định nghĩa tập trung trong `tailwind.config` (`theme.colors`), không hardcode mã màu rải rác.
- Mọi gọi mạng đi qua `src/services/`, không gọi axios trực tiếp trong component.
- Base URL API lấy từ biến môi trường `import.meta.env.VITE_API_URL`, không hardcode.
- Text hiển thị cho người dùng (UI) dùng tiếng Việt có dấu; tên biến/hàm, comment dùng tiếng Anh.
- Thiết kế mobile-first, kiểm tra tối thiểu 3 breakpoint (mobile / tablet / desktop).
- Ảnh món ăn dùng `aspect-ratio` cố định + `object-cover`, có `alt` mô tả món ăn (accessibility).
- Trạng thái loading/error/success của mọi thao tác gọi API phải hiển thị rõ cho người dùng.

## Quy trình làm việc
- Trước khi tạo trang/tính năng mới (hoặc đổi bố cục lớn) → dùng skill `brainstorming` để chốt phạm vi với chủ shop trước khi code.
- Khi xây section/trang mới, tham khảo skill `ui-reference` để theo đúng pattern của website bán đồ ăn chuyên nghiệp.
- Không tự ý thêm thư viện/kiến trúc mới (state management, CMS, thanh toán...) mà chưa hỏi qua brainstorming.
