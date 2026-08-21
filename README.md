# Breakfast Shop Frontend

Frontend website cho quán ăn sáng (bánh cuốn, bún chả) — React + TypeScript + Vite + Tailwind CSS + Axios + React Router.

## Bắt đầu

```bash
npm install
cp .env.example .env   # điền VITE_API_URL trỏ tới API backend serverless
npm run dev
```

## Scripts

- `npm run dev` — chạy dev server (Vite).
- `npm run build` — type-check (`tsc -b`) rồi build production vào `dist/`.
- `npm run preview` — xem thử bản build production.
- `npm run lint` — chạy oxlint.

## Cấu trúc dự án

```
src/
  assets/        # ảnh, icon, font
  components/    # component dùng chung (Button, LinkButton, SectionHeading, MenuRow, Layout, ProtectedRoute...)
  sections/      # block nội dung lớn, nhúng vào pages/ (Header, Hero, Menu, About, Contact, Footer)
  pages/         # từng route/trang, khai báo trong src/App.tsx
  context/       # React Context dùng chung nhiều trang (AuthContext)
  services/      # axios instance + API calls
  types/         # TypeScript types
  utils/         # hàm tiện ích
  data/          # dữ liệu mẫu (thực đơn, thông tin quán) — thay bằng dữ liệu/API thật khi có
```

Chi tiết quy ước code và quy trình làm việc xem tại [`CLAUDE.md`](./CLAUDE.md).

## Route hiện có

| Route | Trang | Ghi chú |
|---|---|---|
| `/` | Trang chủ | Hero + món nổi bật + CTA liên hệ |
| `/thuc-don` | Thực đơn | Lọc theo nhóm món, trình bày dạng danh sách đánh số |
| `/thuc-don/:id` | Chi tiết món | Ảnh đặt chỗ + mô tả + đánh giá món ăn + món liên quan, nút "Thêm vào giỏ hàng" hoạt động thật |
| `/dat-ban-truoc` | Đặt bàn trước | Chọn ngày/khung giờ/số người qua cửa sổ nổi |
| `/gioi-thieu` | Giới thiệu | |
| `/lien-he` | Liên hệ | Form gửi qua Axios tới `VITE_API_URL` |
| `/dang-nhap` | Đăng nhập | Chỉ đăng nhập bằng Google (giả lập UI, chưa nối Google Identity Services thật) |
| `/tai-khoan` | Tài khoản | Route bảo vệ — redirect về `/dang-nhap` nếu chưa đăng nhập. Hiển thị avatar/tên/email từ Google + form SĐT/địa chỉ giao hàng |

## Trạng thái hiện tại

Nhiều trang riêng biệt dùng React Router. Giao diện theo hệ thống thiết kế **"Ấn Bản Sáng"** (poster/báo in, một họ chữ Archivo, hai màu chủ đạo đen-đỏ trên nền giấy — chi tiết tại `.claude/skills/ui-reference/SKILL.md`).

Đăng nhập chỉ bằng Google — không còn form SĐT/mật khẩu, không có trang đăng ký. **Chưa có Google OAuth Client ID** — `src/services/authService.ts` (`loginWithGoogleRequest`) hiện giả lập trả về một hồ sơ mẫu ngay lập tức để dựng luồng UI trước; thay bằng tích hợp Google Identity Services thật khi có Client ID. Trạng thái đăng nhập lưu ở `AuthContext` (React Context + `localStorage`). Tài khoản có `name`/`email`/`avatarUrl` (từ Google) + `phone`/`address` (người dùng tự nhập, lưu qua nút "Lưu thông tin" ở trang Tài khoản).

Giỏ hàng + đặt món online, đánh giá món ăn và đặt bàn trước theo khung giờ đã hoạt động ở phần frontend (state qua `CartContext`, ngăn kéo `CartDrawer`, các modal `ReviewModal`/`ReservationModal`) — xem chi tiết ở `CLAUDE.md`. Backend/DB cho các tính năng này (`/orders`, `/reviews`, `/reservations`) do chủ shop tự xây; cho tới lúc đó, các thao tác gửi đơn/đánh giá/đặt bàn sẽ hiển thị trạng thái lỗi (đúng như thiết kế).

Tên món/giá và thông tin quán trong `src/data/` đang là dữ liệu mẫu — cập nhật tên món/giá và thông tin quán thật (`src/data/menu.ts`, `src/data/shopInfo.ts`) khi sẵn sàng.
