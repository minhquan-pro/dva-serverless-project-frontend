# Breakfast Shop Frontend — Project Rules

## Bối cảnh dự án
Frontend cho website bán đồ ăn sáng của nhà (bánh cuốn, bún chả, ...). Đây là phần frontend của "dva-serverless-project" — backend/DB do chủ shop tự thiết kế (dùng luôn cho bài tập lớn môn Cơ sở dữ liệu), giao tiếp qua REST API bằng Axios. Dự án đã được scaffold (Vite + React + TypeScript + Tailwind v4 + Axios + React Router), nhiều trang riêng biệt, có form liên hệ, đăng nhập bằng Google, giỏ hàng + đặt món online, đánh giá món ăn và đặt bàn trước theo khung giờ (xem mục "Giỏ hàng, đánh giá & đặt bàn" bên dưới).

## Router & xác thực (đã chốt qua brainstorming)
- **Nhiều trang riêng biệt** (không phải one-page nữa): `/` (Trang chủ), `/thuc-don`, `/thuc-don/:id` (chi tiết món), `/dat-ban-truoc` (đặt bàn), `/gioi-thieu`, `/lien-he`, `/dang-nhap`, `/tai-khoan` (route bảo vệ, redirect về `/dang-nhap` nếu chưa đăng nhập qua `ProtectedRoute`). `Layout` (Header + `<Outlet/>` + Footer + `CartDrawer`) bọc toàn bộ route qua `App.tsx`.
- **Đăng nhập CHỈ bằng Google — không còn form SĐT/mật khẩu, không có trang đăng ký riêng.** `/dang-ky` đã bị xoá (trả 404). Quyết định vì Google cung cấp sẵn tên/email/avatar, không cần chủ shop tự xây form đăng ký + mã hoá mật khẩu.
- **Google Sign-In hiện là bản giả lập UI** — quán chưa có OAuth Client ID nên `src/services/authService.ts` (`loginWithGoogleRequest`) chỉ trả về hồ sơ mẫu (`Khách Google`), KHÔNG gọi Google Identity Services thật. Khi có Client ID, thay hàm này bằng tích hợp GIS thật (script `accounts.google.com/gsi/client` + xác thực `id_token`), không đổi chữ ký `AuthContext`/`AuthUser` nếu không cần thiết.
- Trạng thái đăng nhập lưu ở `src/context/AuthContext.tsx` (React Context + `localStorage`, KHÔNG dùng thêm thư viện state management ngoài). `AuthUser` gồm `name`/`email`/`avatarUrl` (từ Google, coi như chỉ đọc) + `phone`/`address` (người dùng tự nhập trong trang Tài khoản, lưu qua `updateProfile()`).
- Trang Tài khoản (`AccountPage.tsx`, route `/tai-khoan`) hiển thị avatar/tên/email từ Google + form SĐT/địa chỉ giao hàng (1 địa chỉ duy nhất) có nút "Lưu thông tin".

## Giỏ hàng, đánh giá & đặt bàn (đã chốt qua brainstorming — phong cách "Ngăn Kéo & Thẻ")
Sau khi brainstorm 3 tính năng mở rộng (chủ shop tự xây backend/DB, Claude chỉ thiết kế frontend) và duyệt 1 trong 3 phương án UI tổng thể ("Ngăn Kéo & Thẻ" — overlay/drawer, cảm giác app), đã áp dụng vào code:
- **Giỏ hàng + đặt món online**: `CartContext` (`src/context/CartContext.tsx`, React Context + `localStorage` key `breakfast-shop-cart`, giống pattern `AuthContext`) quản lý `items`/`totalItems`/`subtotal` + trạng thái đóng/mở. `CartDrawer` (`src/components/CartDrawer.tsx`) là ngăn kéo trượt từ cạnh phải, mount 1 lần trong `Layout`, mở qua icon giỏ hàng ở `Header` (badge đỏ hiện số món) hoặc tự mở khi bấm "Thêm vào giỏ hàng" ở `ProductPage`. Trong ngăn kéo: danh sách món (chỉnh số lượng/xoá), accordion "Giao hàng" (SĐT/địa chỉ, tự điền từ hồ sơ Google nếu đã đăng nhập) + "Thanh toán" (chọn COD hoặc Chuyển khoản), tổng tiền, nút "Đặt hàng" gọi `orderService.placeOrderRequest()` (POST `/orders` qua `api` — chưa có backend nên sẽ lỗi cho tới khi chủ shop dựng API, UI đã hiển thị đủ 3 trạng thái loading/success/error đúng theo quy ước).
- **Đánh giá & nhận xét món ăn**: `ProductPage` hiển thị điểm trung bình (`StarRating`, `src/components/StarRating.tsx`) + lưới thẻ đánh giá ngay dưới thông tin món, thẻ "+ Viết đánh giá" mở `ReviewModal` (`src/components/ReviewModal.tsx`) — chọn sao + nhập nhận xét, gửi qua `reviewService.submitReviewRequest()` (POST `/reviews`). Dữ liệu mẫu ban đầu ở `src/data/reviews.ts` (`REVIEWS_BY_PRODUCT`, keyed theo `id` món).
- **Đặt bàn trước theo khung giờ**: route `/dat-ban-truoc` (`ReservationPage.tsx`, có link "Đặt bàn" trong nav) — thẻ giới thiệu + nút "Đặt bàn ngay" mở `ReservationModal` (`src/components/ReservationModal.tsx`, cùng dùng `Modal` dùng chung với `ReviewModal`): ngày, khung giờ dạng chip (6:00–10:00, cách 30 phút, khớp giờ mở cửa quán), số người, họ tên/SĐT (tự điền nếu đã đăng nhập), ghi chú — gửi qua `reservationService.submitReservationRequest()` (POST `/reservations`).
- Cả 3 service trên (`orderService.ts`, `reviewService.ts`, `reservationService.ts`) dùng chung `api` instance (giống `contactService.ts`) — gọi endpoint thật ngay từ đầu (không mock), sẵn sàng hoạt động khi chủ shop dựng xong backend; hiện tại sẽ rơi vào trạng thái lỗi vì chưa có API — đúng như thiết kế UI đã xử lý.
- Đây là tính năng thật (frontend hoạt động đầy đủ: thêm/sửa/xoá giỏ hàng, chọn sao, chọn khung giờ...), KHÔNG còn là giao diện giả lập như trước — chỉ riêng phần lưu trữ backend/DB là do chủ shop tự xây.

## Nhận diện thiết kế đã chốt: "Ấn Bản Sáng"
Sau khi brainstorm và xem qua 9 phương án giao diện (bao gồm cả "Phố Ẩm Thực" từng áp dụng trước đó), chủ shop đã chọn hướng **poster in ấn/báo cũ táo bạo** — đây là hệ thống thiết kế chính thức, ưu tiên áp dụng cho mọi trang/section mới:
- **Màu** (định nghĩa trong `src/index.css` qua `@theme`): `ink` #1b1b18 (chữ/viền/nền tối), `paper` #f2ecdd (nền giấy chính), `paper-deep` #ece3cd (nền phụ/hover), `red` #b4302a (màu nhấn duy nhất — dùng cho giá, CTA, số thứ tự section), `grid` #c9c2ac (viền mảnh/hairline).
- **Font**: chỉ MỘT họ chữ — Archivo, dùng ở nhiều độ đậm (400 → 900). Tiêu đề (`h1`/`h2`/`h3`) mặc định `font-weight: 900`, `uppercase`, `letter-spacing: -0.01em` (đã set sẵn trong `src/index.css`). Load qua Google Fonts trong `index.html`.
- **Hình khối đặc trưng**: KHÔNG bo góc (poster/print, không `rounded-*`), viền mảnh `border-[1.5px]`/dày `border-[3px] border-ink` phân tách section, hairline rule (`h-px bg-ink`) kéo dài bên cạnh tiêu đề, số thứ tự đỏ kiểu mục lục (`§ 01`, `§ 02`...) — chỉ dùng số khi nội dung thực sự có thứ tự (3 section chính: Thực đơn/Giới thiệu/Liên hệ).
- **Thực đơn trình bày dạng danh sách đánh số** (xem `src/components/MenuRow.tsx`) — không phải card ảnh — số thứ tự (`01`, `02`...) + tên món + mô tả + giá canh phải, giống một ấn phẩm in, không dùng icon/emoji trang trí. Mỗi dòng là link sang `/thuc-don/:id`.
- **Danh sách thực đơn (`MenuRow`) vẫn thuần chữ, không ảnh.** Riêng **trang chi tiết món** (`ProductPage.tsx`) đã có khung ảnh đặt chỗ (`aspect-[4/3]`, viền `border-[1.5px] border-ink`, khung nét đứt bên trong + icon "Ảnh món ăn sẽ được cập nhật") — chủ shop sẽ thêm ảnh thật sau; khi có ảnh, thay khối placeholder bằng `<img>` `object-cover` cùng kích thước, giữ nguyên khung viền.
- Style này được coi là baseline — nếu đổi hướng thiết kế khác, cập nhật lại mục này.

## Tech stack
- React 18 + Vite + TypeScript
- Tailwind CSS v4 (utility-first, mobile-first, theme định nghĩa qua `@theme` trong `src/index.css`)
- Axios cho gọi API
- React Router (`react-router-dom`) — nhiều trang riêng biệt, khai báo route trong `src/App.tsx`
- ESLint (oxlint) cho chất lượng code

## Cấu trúc thư mục
```
src/
  assets/        # ảnh, icon, font
  components/    # component dùng chung (Button, LinkButton, SectionHeading, MenuRow, Layout, ProtectedRoute, CartDrawer, Modal, ReviewModal, ReservationModal, StarRating, QuantityStepper...)
  sections/      # block nội dung lớn, được nhúng vào pages/ (Hero, Menu, About, Contact, Header, Footer)
  pages/         # từng route/trang (HomePage, MenuPage, LoginPage, AccountPage...) — khai báo trong App.tsx
  context/       # React Context cho state dùng chung nhiều trang (AuthContext...)
  hooks/         # custom hooks
  services/      # axios instance + API calls (services/api.ts, services/authService.ts...)
  types/         # TypeScript types/interfaces
  utils/         # hàm tiện ích
  data/          # dữ liệu tĩnh (menu, thông tin quán) khi chưa có API
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
