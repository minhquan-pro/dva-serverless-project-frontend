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
- Số thứ tự đỏ kiểu mục lục (`§ 01`, `§ 02`...) — prop `index` của `SectionHeading` là OPTIONAL, chỉ truyền khi nội dung thực sự có thứ tự cố định trong CÙNG một trang (hiện không còn dùng vì mỗi mục đã tách thành trang riêng qua Router — xem mục Router bên dưới). Không lạm dụng đánh số cho nội dung không có trình tự thật.
- Chữ viền rỗng (`-webkit-text-stroke`) dùng cho từ khoá nổi bật trong hero — hiệu ứng poster hai lớp chữ đặc/rỗng.
- Không dùng icon/emoji trang trí — thực đơn và thông tin chỉ dùng typographic. Danh sách thực đơn (`MenuRow`) không ảnh; riêng trang chi tiết món có khung ảnh đặt chỗ (xem mục Bố cục § Product bên dưới) — chủ shop sẽ thêm ảnh thật sau.

## Router — nhiều trang riêng biệt
Dự án dùng `react-router-dom`, route khai báo tại `src/App.tsx`, bọc trong `Layout` (`src/components/Layout.tsx` = Header + `<Outlet/>` + Footer + `CartDrawer`). Mỗi trang trong `src/pages/` là 1 route:
- `/`, `/thuc-don`, `/thuc-don/:id` (chi tiết món, `ProductPage.tsx`), `/dat-ban-truoc` (đặt bàn, `ReservationPage.tsx`), `/gioi-thieu`, `/lien-he`, `/dang-nhap` (chỉ đăng nhập Google, không có trang đăng ký riêng), `/tai-khoan` (route bảo vệ qua `ProtectedRoute`, xem `AuthContext`).
- Vì mỗi mục nay là 1 trang riêng (không còn scroll 1 trang dài), KHÔNG dùng số thứ tự `§ 0X` xuyên suốt nhiều trang nữa — mỗi trang chỉ có 1 `SectionHeading` không cần `index`.
- Điều hướng nội bộ dùng `<Link>`/`<NavLink>` (`react-router-dom`) hoặc `LinkButton` (`src/components/LinkButton.tsx` — giống `Button` nhưng render `<Link>`, dùng khi CTA điều hướng sang trang khác thay vì submit form).
- Nav trong `Header` dùng `NavLink` để tô đậm trang hiện tại (nền `ink`/chữ `paper`).

## Bố cục các section (đã áp dụng, dùng làm mẫu khi thêm section/trang mới)
1. **Header** — dải thông tin nhỏ phía trên (giờ mở cửa), logo chữ hoa đậm (chữ "Ăn Sáng" tô đỏ) Link về `/`, nav dạng khối viền có gạch chia (`divide-x`), trạng thái đăng nhập (tên/Đăng xuất hoặc link Đăng nhập) bên phải nav.
2. **Hero** (trang chủ) — tag viền đỏ nhỏ phía trên, tiêu đề khổng lồ 2 dòng (dòng 2 dùng chữ viền rỗng), hairline rule ngăn cách với đoạn mô tả + nút CTA điều hướng (`LinkButton`).
3. **Menu** (`/thuc-don`) — nhóm nút lọc dạng khối viền liền nhau, danh sách món đánh số (`MenuRow`) — không phải lưới card. Mỗi dòng là link sang `/thuc-don/:id`.
3b. **Product** (`/thuc-don/:id`, `ProductPage.tsx`) — link "← Quay lại thực đơn" ở đầu trang dẫn về `/` (trang chủ, không phải `/thuc-don`). Bố cục 2 cột: khung ảnh đặt chỗ (`aspect-[4/3]`, viền `border-[1.5px] border-ink`, khung nét đứt `border-dashed border-grid` bên trong, icon + "Ảnh món ăn sẽ được cập nhật" — thay bằng `<img object-cover>` khi có ảnh thật) bên trái, tag danh mục + tên món + giá (đỏ) + mô tả + điểm đánh giá trung bình (`StarRating`) + hairline rule + `QuantityStepper` và nút "Thêm vào giỏ hàng" (hoạt động thật — gọi `useCart().addItem()` rồi tự mở `CartDrawer`) bên phải. Bên dưới là section "Đánh giá món ăn" — lưới thẻ đánh giá (sao + tên + nhận xét + ngày) kèm thẻ viền nét đứt "+ Viết đánh giá" mở `ReviewModal`. Cuối cùng là "Món liên quan" (`SectionHeading` không `index`) — lưới 3 cột (`MenuItem` cùng danh mục ưu tiên trước), mỗi thẻ có số thứ tự đỏ theo đúng vị trí trong `MENU_ITEMS`, dẫn sang trang chi tiết món đó. Món không tồn tại (`id` sai) hiển thị thông báo 404 kèm nút quay lại `/thuc-don`.
3c. **Reservation** (`/dat-ban-truoc`, `ReservationPage.tsx`) — tag viền đỏ "Đặt bàn trước" + `SectionHeading`, bên dưới là 1 khối viền `border-[1.5px] border-ink` giới thiệu ngắn + nút "Đặt bàn ngay" mở `ReservationModal` (ngày, khung giờ dạng chip 6:00–10:00 cách 30 phút, số người, họ tên/SĐT, ghi chú).
4. **About** (`/gioi-thieu`) — 2 cột: đoạn văn bên trái, lưới 2×2 chỉ số thống kê có viền bên phải.
5. **Contact** (`/lien-he`) — nền `bg-ink` tối, thông tin dạng label/value, input chỉ có viền dưới (underline), nút submit đỏ vuông vức.
6. **Login** (`/dang-nhap`) — khung hẹp căn giữa (`max-w-md`), tag viền đỏ "Thành viên · Quán nhà" phía trên, MỘT nút duy nhất "Đăng nhập với Google" (viền vuông, icon Google 4 màu, full-width — không còn tab/form SĐT), `AuthMeta` (giờ mở cửa/SĐT) đóng khung dưới cùng.
7. **Account / Profile** (`/tai-khoan`, "Thẻ Hồ Sơ") — tag "Tài khoản của tôi", khối danh tính đầu trang: avatar vuông viền `border-[1.5px] border-ink` (ảnh Google nếu có `avatarUrl`, nếu không hiện chữ cái đầu tên) + tên (`normal-case`, không hoa toàn bộ) + email + nhãn nhỏ "Đăng nhập bằng Google" kèm icon, ngăn cách bằng hairline `border-b-[1.5px] border-ink`. Bên dưới là form SĐT + địa chỉ giao hàng (input/textarea viền dưới) với nút "Lưu thông tin" — bấm hiện chữ đỏ "Đã lưu." tạm thời. Nút "Đăng xuất" (biến thể `line`) đặt riêng dưới cùng, ngăn cách bằng `border-t`.
8. **Footer** — 2 dòng đơn giản, chữ hoa nhỏ, canh 2 đầu.
9. **CartDrawer** (mount toàn cục trong `Layout`, không phải route riêng) — ngăn kéo trượt từ cạnh phải (`translate-x-full` ↔ `translate-x-0`, `border-l-[3px] border-ink`), có scrim tối phía sau. Mở qua icon giỏ hàng ở `Header` hoặc tự mở sau khi thêm món ở `ProductPage`. Nội dung: danh sách món (ảnh không có, chỉ chữ — đúng tinh thần "Ấn Bản Sáng") với `QuantityStepper` + nút xoá, accordion "Giao hàng"/"Thanh toán" (2 ô chọn COD/Chuyển khoản kiểu khối viền, ô đang chọn nền `ink`), tổng tiền, nút "Đặt hàng" full-width. Trạng thái trống/thành công/lỗi đều có màn hình riêng trong cùng ngăn kéo.
10. **Modal dùng chung** (`ReviewModal`, `ReservationModal`) — hộp thoại giữa màn hình (`Modal.tsx`: scrim + khung viền `border-[1.5px] border-ink`, tiêu đề + nút đóng, đóng bằng Esc/click ra ngoài/nút ✕) — đúng phong cách "Ngăn Kéo & Thẻ" (overlay thay vì trang riêng cho các thao tác phụ).

## Component dùng chung
- `Button` (`src/components/Button.tsx`) — biến thể `solid` (nền ink), `line` (viền, nền trong suốt), `red` (viền/nền đỏ). Không bo góc, chữ hoa, tracking rộng. Export thêm `buttonClassName()` để tái dùng style cho `LinkButton`.
- `LinkButton` (`src/components/LinkButton.tsx`) — render `<Link>` với cùng style `Button`, dùng cho CTA điều hướng trang.
- `SectionHeading` (`src/components/SectionHeading.tsx`) — nhận `index?` (số thứ tự dạng chuỗi, optional), `title`, `description?`, `tone` (`light`/`dark`).
- `MenuRow` (`src/components/MenuRow.tsx`) — 1 dòng thực đơn: số thứ tự + tên/mô tả + giá, dùng trong danh sách thay vì card.
- `Layout` (`src/components/Layout.tsx`) — Header + `<Outlet/>` + Footer + `CartDrawer`, bọc mọi route.
- `ProtectedRoute` (`src/components/ProtectedRoute.tsx`) — redirect về `/dang-nhap` nếu `useAuth().isAuthenticated` false.
- `AuthMeta` (`src/components/AuthMeta.tsx`) — dòng giờ mở cửa/SĐT ở cuối card đăng nhập, lấy từ `SHOP_INFO`.
- `QuantityStepper` (`src/components/QuantityStepper.tsx`) — bộ đếm số lượng dạng khối viền (−/số/+), dùng ở `ProductPage` và `CartDrawer`.
- `StarRating` (`src/components/StarRating.tsx`) — sao ★/☆ typographic (không SVG/emoji), chế độ hiển thị (`value`) hoặc chọn sao (`value` + `onChange`).
- `Modal` (`src/components/Modal.tsx`) — hộp thoại giữa màn hình dùng chung cho `ReviewModal`/`ReservationModal`.
- `CartDrawer`, `ReviewModal`, `ReservationModal` — xem mục Bố cục § 9–10 ở trên.

## Khi gọi API (liên hệ/đặt món/xác thực/giỏ hàng/đánh giá/đặt bàn)
- Dùng chung axios instance ở `src/services/api.ts` với `baseURL` từ `import.meta.env.VITE_API_URL`.
- Mỗi nhóm chức năng có 1 file service riêng (`contactService.ts`, `authService.ts`, `orderService.ts`, `reviewService.ts`, `reservationService.ts`...), không gọi axios trực tiếp trong component.
- Hiển thị rõ 3 trạng thái loading/success/error — xem mẫu trong `src/sections/Contact.tsx`, `src/pages/LoginPage.tsx`, `src/components/CartDrawer.tsx`.
- Trạng thái đăng nhập dùng chung qua `useAuth()` (`src/context/AuthContext.tsx`); giỏ hàng dùng chung qua `useCart()` (`src/context/CartContext.tsx`, cũng persist qua `localStorage`) — không tạo thêm state riêng ở component để lưu user/token/giỏ hàng. `authService.loginWithGoogleRequest()` hiện là giả lập (chưa có Google Client ID) — xem ghi chú trong `CLAUDE.md`. `orderService`/`reviewService`/`reservationService` gọi endpoint thật (`/orders`, `/reviews`, `/reservations`) ngay từ đầu — sẽ báo lỗi cho tới khi có backend, đó là hành vi đúng.
