import React from 'react';
import { cn } from '../../utils/cn';

const Progress = React.forwardRef(
  ({ className, value = 0, max = 100, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        className={cn(
          'relative h-4 w-full overflow-hidden rounded-full bg-secondary',
          className
        )}
        {...props}>
        {children || (
          <div
            className="h-full w-full flex-1 bg-primary transition-all"
            style={{ transform: `translateX(-${100 - (value / max) * 100}%)` }}
          />
        )}
      </div>
    );
  }
);

Progress.displayName = 'Progress';

export default Progress;
