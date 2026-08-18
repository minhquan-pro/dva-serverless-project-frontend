---
name: brainstorming
description: Dùng TRƯỚC khi tạo trang, tính năng, component mới hoặc đổi bố cục lớn cho website bán đồ ăn sáng. Đặt câu hỏi làm rõ phạm vi, đề xuất 2-3 phương án kèm ưu/nhược điểm, và chờ chủ shop duyệt trước khi scaffold hoặc viết code.
---

# Brainstorming — Breakfast Shop Frontend

## Khi nào dùng
Dùng skill này khi chuẩn bị:
- Tạo trang mới (Menu, Giới thiệu, Liên hệ, Đặt hàng...).
- Thêm tính năng có ảnh hưởng tới trải nghiệm/luồng người dùng (giỏ hàng, đặt món online, đăng ký nhận tin, đăng nhập...).
- Đổi bố cục lớn của trang hiện có.
- Chọn thư viện/kiến trúc mới (state management, router, thanh toán...).

KHÔNG cần dùng cho việc nhỏ: sửa lỗi, chỉnh style/copy, refactor không đổi hành vi — cứ làm thẳng.

## HARD-GATE
Không scaffold project, không tạo component/trang mới, không viết code cho tính năng mới cho tới khi chủ shop đã duyệt phương án trong hội thoại. Việc nhỏ vẫn cần chốt phạm vi ngắn gọn — không phải là được bỏ qua bước hỏi, chỉ là câu trả lời ngắn hơn.

## Quy trình
1. **Hỏi làm rõ** — ưu tiên dùng `AskUserQuestion` khi có thể liệt kê lựa chọn rõ ràng, ví dụ:
   - Trang/tính năng này phục vụ mục đích gì cho khách hàng cuối?
   - Chỉ hiển thị thông tin (menu, giờ mở cửa, địa chỉ) hay cần khách đặt món/đặt bàn thật sự?
   - Có cần gọi API backend (lưu đơn hàng, gửi email xác nhận...) hay chỉ là trang tĩnh?
   - Đã có ảnh món ăn, giá, tên món cụ thể chưa, hay dùng dữ liệu mẫu (placeholder) trước?
   - Có yêu cầu về màu sắc/logo/thương hiệu quán chưa?
   - Website chỉ tiếng Việt, hay cần thêm tiếng Anh?
2. **Đề xuất 2-3 phương án ngắn gọn kèm đánh đổi**, ví dụ:
   - Trang chủ 1-page (nhanh, dễ làm) vs multi-page có router (chuyên nghiệp hơn, tốn công hơn).
   - Form liên hệ/đặt món đơn giản (gửi qua API có sẵn) vs giỏ hàng đầy đủ (cần state management, phức tạp hơn nhiều).
3. **Chờ chủ shop chọn phương án** — trình bày ngắn gọn trong chat, không cần viết tài liệu spec dài (dự án nhỏ).
4. Sau khi được duyệt, tóm tắt phạm vi đã chốt bằng 3-5 gạch đầu dòng, rồi mới bắt đầu implement (có thể phối hợp với skill `ui-reference` cho phần bố cục).

## Nguyên tắc
- Câu hỏi ngắn, cụ thể, có lựa chọn sẵn — tránh hỏi mở mông lung.
- Nếu chủ shop trả lời "tuỳ bạn"/"làm sao cho đẹp", đưa ra đề xuất mặc định hợp lý (theo `ui-reference`) và nói rõ đó là mặc định, để họ chỉnh sau nếu cần — không dừng vô hạn chờ quyết định.
- Không tạo file spec/markdown thiết kế trừ khi chủ shop yêu cầu lưu lại.
