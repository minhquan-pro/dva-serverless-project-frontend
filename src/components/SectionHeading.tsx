interface SectionHeadingProps {
  kicker: string;
  title: string;
  description?: string;
  tone?: "light" | "dark";
}

const TONE_CLASSES = {
  light: { kicker: "bg-ink text-yellow", title: "text-ink", desc: "text-ink/70" },
  dark: { kicker: "bg-yellow text-ink", title: "text-cream", desc: "text-cream/80" },
} as const;

export function SectionHeading({ kicker, title, description, tone = "light" }: SectionHeadingProps) {
  const classes = TONE_CLASSES[tone];
  return (
    <div className="mx-auto max-w-xl text-center">
      <span
        className={`inline-block rounded-full px-4 py-1.5 font-display text-xs font-bold uppercase tracking-wide ${classes.kicker}`}
      >
        {kicker}
      </span>
      <h2 className={`mt-4 text-3xl font-bold sm:text-4xl ${classes.title}`}>{title}</h2>
      {description && <p className={`mt-3 font-semibold leading-relaxed ${classes.desc}`}>{description}</p>}
    </div>
  );
}
