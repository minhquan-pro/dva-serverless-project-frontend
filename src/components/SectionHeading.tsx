interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent-500">{eyebrow}</p>
      )}
      <h2 className="text-3xl font-bold text-brand-900 sm:text-4xl">{title}</h2>
      {description && <p className="mt-3 text-brand-700">{description}</p>}
    </div>
  );
}
