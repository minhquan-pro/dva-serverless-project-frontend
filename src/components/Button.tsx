import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "accent" | "dark";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-red text-cream shadow-[4px_4px_0_var(--color-ink)] hover:shadow-[2px_2px_0_var(--color-ink)]",
  secondary: "bg-white text-ink shadow-[4px_4px_0_var(--color-ink)] hover:shadow-[2px_2px_0_var(--color-ink)]",
  accent: "bg-green text-cream shadow-[3px_3px_0_var(--color-ink)] hover:shadow-[2px_2px_0_var(--color-ink)]",
  dark: "bg-ink text-yellow shadow-[3px_3px_0_var(--color-red-deep)] hover:shadow-[1px_1px_0_var(--color-red-deep)]",
};

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center gap-2 rounded-full border-[3px] border-ink px-6 py-3 font-display font-extrabold transition-[transform,box-shadow] duration-150 hover:translate-x-px hover:translate-y-px disabled:cursor-not-allowed disabled:opacity-60 ${VARIANT_CLASSES[variant]} ${className}`}
      {...props}
    />
  );
}
