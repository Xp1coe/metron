"use client";

export interface SegmentedToggleOption<Value extends string> {
  value: Value;
  label: string;
  disabled?: boolean;
  /** Explains a disabled option. */
  hint?: string;
}

interface SegmentedToggleProps<Value extends string> {
  label: string;
  /** ID of a visible label. Overrides `label` as the accessible name. */
  labelledBy?: string;
  value: Value;
  options: SegmentedToggleOption<Value>[];
  onChange: (value: Value) => void;
  className?: string;
}

/** A row of native buttons where exactly one option is pressed. */
export default function SegmentedToggle<Value extends string>({
  label,
  labelledBy,
  value,
  options,
  onChange,
  className = "",
}: SegmentedToggleProps<Value>) {
  return (
    <div
      role="group"
      aria-label={labelledBy ? undefined : label}
      aria-labelledby={labelledBy}
      className={`inline-flex h-12 overflow-hidden rounded-lg border border-slate-200 bg-white ${className}`}
    >
      {options.map((option) => {
        const pressed = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={pressed}
            disabled={option.disabled}
            title={option.disabled ? option.hint : undefined}
            onClick={() => onChange(option.value)}
            className={`h-full min-w-24 flex-1 cursor-pointer whitespace-nowrap px-4 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:text-slate-400 motion-reduce:transition-none ${pressed ? "bg-[#0739cf] text-white" : "text-slate-600 enabled:hover:bg-slate-50"}`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
