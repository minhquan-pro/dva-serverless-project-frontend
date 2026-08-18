interface SectionHeadingProps {
  index: string;
  title: string;
  description?: string;
  tone?: "light" | "dark";
}

const TONE_CLASSES = {
  light: { title: "text-ink", rule: "bg-ink", desc: "text-ink/60" },
  dark: { title: "text-paper", rule: "bg-paper/35", desc: "text-paper/70" },
} as const;

export function SectionHeading({ index, title, description, tone = "light" }: SectionHeadingProps) {
  const classes = TONE_CLASSES[tone];
  return (
    <div className="mb-11">
      <div className="flex items-baseline gap-4">
        <span className="whitespace-nowrap font-display text-sm font-extrabold text-red">§ {index}</span>
        <h2 className={`text-3xl sm:text-4xl ${classes.title}`}>{title}</h2>
        <span className={`hidden h-px flex-1 sm:block ${classes.rule}`} />
      </div>
      {description && <p className={`mt-4 max-w-[60ch] font-semibold normal-case ${classes.desc}`}>{description}</p>}
    </div>
  );
}
