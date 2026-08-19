import type { AuthUser } from "../types/auth";

/**
 * Google Identity Services thật chưa được tích hợp — quán chưa có OAuth Client ID.
 * Hàm này giả lập một lượt đăng nhập Google thành công để dựng luồng UI trước;
 * thay bằng lời gọi Google Identity Services + xác thực id_token khi có Client ID.
 */
export async function loginWithGoogleRequest(): Promise<AuthUser> {
  return {
    name: "Khách Google",
    email: "khach@gmail.com",
    avatarUrl: null,
    phone: "",
    address: "",
  };
}
