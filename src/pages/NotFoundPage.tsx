import { LinkButton } from "../components/LinkButton";

export function NotFoundPage() {
  return (
    <section className="px-6 py-24 text-center sm:px-7 sm:py-32">
      <span className="font-display text-sm font-extrabold text-red">404</span>
      <h1 className="mt-4 text-4xl sm:text-5xl">Không tìm thấy trang</h1>
      <p className="mx-auto mt-4 max-w-[46ch] font-medium text-ink/65">
        Trang bạn tìm không tồn tại hoặc đã được chuyển đi nơi khác.
      </p>
      <LinkButton to="/" variant="solid" className="mt-8">
        Về trang chủ
      </LinkButton>
    </section>
  );
}
