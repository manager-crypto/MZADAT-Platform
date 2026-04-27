import * as React from "react";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  label?: string;
  showValue?: boolean;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, max = 100, label, showValue = false, ...props }, ref) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
        className={`relative w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700 ${className}`}
        {...props}
      >
        <div
          className="h-full w-full flex-1 bg-[#47CCD0] transition-all duration-300"
          style={{ transform: `translateX(-${100 - percentage}%)` }}
        />
        {showValue && (
          <span className="sr-only">
            {value} of {max} ({percentage.toFixed(0)}%)
          </span>
        )}
      </div>
    );
  }
);

Progress.displayName = "Progress";

export { Progress };
