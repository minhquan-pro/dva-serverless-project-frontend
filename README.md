# Breakfast Shop Frontend

Frontend website cho quán ăn sáng (bánh cuốn, bún chả) — React + TypeScript + Vite + Tailwind CSS + Axios.

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
  components/    # component dùng chung (Button, MenuCard, SectionHeading...)
  sections/      # các block lớn của trang (Header, Hero, Menu, About, Contact, Footer)
  services/      # axios instance + API calls
  types/         # TypeScript types
  utils/         # hàm tiện ích
  data/          # dữ liệu mẫu (thực đơn, thông tin quán) — thay bằng dữ liệu/API thật khi có
```

Chi tiết quy ước code và quy trình làm việc xem tại [`CLAUDE.md`](./CLAUDE.md).

## Trạng thái hiện tại

Bản one-page: Hero, Thực đơn (dữ liệu mẫu, lọc theo nhóm), Giới thiệu, form Liên hệ (gửi qua Axios tới `VITE_API_URL`). Giao diện theo hệ thống thiết kế **"Phố Ẩm Thực"** (bo tròn, viền dày, đổ bóng cứng, tông đỏ/vàng/xanh lá — chi tiết tại `.claude/skills/ui-reference/SKILL.md`). Tên món/giá và thông tin quán trong `src/data/` đang là dữ liệu mẫu — cập nhật tên món/giá và thông tin quán thật (`src/data/menu.ts`, `src/data/shopInfo.ts`) khi sẵn sàng; ảnh chụp món ăn thật có thể bổ sung sau khi quán có ảnh đẹp.
