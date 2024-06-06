import * as React from 'react';

const sizes = {
  sm: 'h-[36px] px-4',
  base: 'h-[38px] px-4 text-base',
} as const;

type InputProps = Omit<
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'size' | 'prefix' | 'type' | 'onChange'
> &
  Partial<{
    className: string;
    name: string;
    placeholder: string;
    type: string;
    label: string;
    prefix: React.ReactNode;
    suffix: React.ReactNode;
    onChange: Function;
    size: keyof typeof sizes;
    color: string;
  }>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, prefix, suffix, onChange, size = 'base', ...props }, ref) => {
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      if (onChange) onChange(e?.target?.value);
    };

    return (
      <div
        className={`input flex items-center justify-center self-stretch gap-2 text-gray-primary text-base border-gray-border border border-solid rounded-md ${sizes[size] || ''}`}
      >
        {!!prefix && prefix}
        <input
          type={type}
          className="text-sm text-gray-700 grow"
          onChange={handleChange}
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
