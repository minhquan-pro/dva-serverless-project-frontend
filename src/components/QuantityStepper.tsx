interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
}

export function QuantityStepper({ value, onChange, min = 1 }: QuantityStepperProps) {
  return (
    <div className="inline-flex items-stretch border-[1.5px] border-ink">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        aria-label="Giảm số lượng"
        className="w-9 font-display text-lg font-extrabold text-ink hover:bg-paper-deep"
      >
        −
      </button>
      <span className="flex w-9 items-center justify-center border-x-[1.5px] border-ink font-display font-extrabold tabular-nums">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        aria-label="Tăng số lượng"
        className="w-9 font-display text-lg font-extrabold text-ink hover:bg-paper-deep"
      >
        +
      </button>
    </div>
  );
}
