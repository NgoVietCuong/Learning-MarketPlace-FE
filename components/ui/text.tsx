import React from "react";

const sizes = {
  xs: "text-xs",
  sm: "text-sm",
  s: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl md:text-[22px]",
  "3xl": "text-[26px] md:text-2xl sm:text-[22px]",
  "4xl": "text-3xl md:text-[28px] sm:text-[26px]",
  "5xl": "text-[32px] md:text-3xl sm:text-[28px]",
  "6xl": "text-[44px] md:text-[40px] sm:text-[34px]",
  "7xl": "text-8xl md:text-5xl",
};

export type TextProps = Partial<{
  className: string;
  as: any;
  size: keyof typeof sizes;
}> &
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  >;

const Text: React.FC<React.PropsWithChildren<TextProps>> = ({
  children,
  className = "",
  as,
  size = "md" as keyof typeof sizes,
  ...restProps
}) => {
  const Component = as || "p";

  return (
    <Component
      className={`text-gray-primary font-poppins ${className} ${sizes[size]}`}
      {...restProps}
    >
      {children}
    </Component>
  );
};

export { Text };
