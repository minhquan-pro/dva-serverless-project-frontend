import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "solid" | "line" | "red";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  solid: "bg-ink text-paper hover:bg-red",
  line: "bg-transparent text-ink hover:bg-paper-deep",
  red: "bg-red text-paper border-red hover:bg-transparent hover:text-red",
};

export function Button({ variant = "solid", className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center gap-2 border-[1.5px] border-ink px-6 py-3.5 font-display text-sm font-extrabold uppercase tracking-wide transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-60 ${VARIANT_CLASSES[variant]} ${className}`}
      {...props}
    />
  );
}
