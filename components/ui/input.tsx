import * as React from 'react';

import { cn } from '@/lib/utils';

const sizes = {
  xs: "h-[40px] px-4 text-base",
} as const;

type InputProps = Omit<
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "size" | "prefix" | "type" | "onChange"
> &
  Partial<{
    className: string;
    name: string;
    placeholder: string;
    type: string;
    label: string;
    prefix: React.ReactNode;
    suffix: React.ReactNode;
    // onChange: Function;
    size: keyof typeof sizes;
    color: string;
  }>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, prefix, suffix, size = "xs", ...props }, ref) => {
    return (
      <div className={`flex items-center justify-center self-stretch gap-2 text-gray-primary text-base border-gray-border border border-solid rounded-md ${sizes[size] || ""}`}>
        {!!prefix && prefix}
        <input
          type={type}
          className="text-sm text-gray-700 grow"
          // className={cn(
          //   "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          //   className
          // )}
          ref={ref}
          {...props}
        />
        {!!suffix && suffix}
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
