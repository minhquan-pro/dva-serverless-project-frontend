const STAR_VALUES = [1, 2, 3, 4, 5];

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  size?: "sm" | "md" | "lg";
}

const SIZE_CLASSES: Record<NonNullable<StarRatingProps["size"]>, string> = {
  sm: "text-xs gap-0.5",
  md: "text-base gap-1",
  lg: "text-2xl gap-1.5",
};

export function StarRating({ value, onChange, size = "md" }: StarRatingProps) {
  const sizeClass = SIZE_CLASSES[size];

  if (onChange) {
    return (
      <div className={`flex text-red ${sizeClass}`} role="radiogroup" aria-label="Chọn số sao">
        {STAR_VALUES.map((star) => (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={star === value}
            aria-label={`${star} sao`}
            onClick={() => onChange(star)}
            className="leading-none"
          >
            {star <= value ? "★" : "☆"}
          </button>
        ))}
      </div>
    );
  }

  return (
    <span className={`flex text-red ${sizeClass}`} aria-label={`${value} trên 5 sao`}>
      {STAR_VALUES.map((star) => (
        <span key={star} aria-hidden="true">
          {star <= Math.round(value) ? "★" : "☆"}
        </span>
      ))}
    </span>
  );
}
