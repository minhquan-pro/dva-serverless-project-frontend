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
| `/thuc-don/:id` | Chi tiết món | Ảnh đặt chỗ + mô tả + món liên quan, nút "Thêm vào giỏ hàng" chưa hoạt động |
| `/gioi-thieu` | Giới thiệu | |
| `/lien-he` | Liên hệ | Form gửi qua Axios tới `VITE_API_URL` |
| `/dang-nhap` | Đăng nhập | SĐT + mật khẩu |
| `/dang-ky` | Đăng ký | Họ tên, SĐT, mật khẩu |
| `/tai-khoan` | Tài khoản | Route bảo vệ — redirect về `/dang-nhap` nếu chưa đăng nhập |

## Trạng thái hiện tại

Nhiều trang riêng biệt dùng React Router. Giao diện theo hệ thống thiết kế **"Ấn Bản Sáng"** (poster/báo in, một họ chữ Archivo, hai màu chủ đạo đen-đỏ trên nền giấy — chi tiết tại `.claude/skills/ui-reference/SKILL.md`).

Đăng nhập/đăng ký chỉ dùng số điện thoại + mật khẩu (không OTP). **Backend xác thực chưa có** — `src/services/authService.ts` đã gọi đúng `POST /auth/login` / `POST /auth/register` qua axios, sẵn sàng hoạt động khi backend triển khai xong; hiện tại các request này sẽ báo lỗi cho tới khi có API thật. Trạng thái đăng nhập lưu ở `AuthContext` (React Context + `localStorage`), tài khoản mới chỉ lưu tên/SĐT — chuẩn bị cho tính năng đặt món online sau này, chưa có giỏ hàng/đơn hàng.

Tên món/giá và thông tin quán trong `src/data/` đang là dữ liệu mẫu — cập nhật tên món/giá và thông tin quán thật (`src/data/menu.ts`, `src/data/shopInfo.ts`) khi sẵn sàng.
