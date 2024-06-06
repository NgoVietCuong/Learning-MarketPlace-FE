import React from "react";

const sizes = {
  "3xl": "text-xl font-semibold",
  "2xl": "text-lg font-semibold",
  "5xl": "text-2xl font-semibold md:text-[22px]",
  "4xl": "text-[22px] font-semibold",
  "7xl": "text-3xl font-semibold md:text-[28px] sm:text-[26px]",
  "6xl": "text-[28px] font-bold md:text-[26px] sm:text-2xl",
  "9xl": "text-4xl font-semibold md:text-[34px] sm:text-[32px]",
  "8xl": "text-[32px] font-bold md:text-3xl sm:text-[28px]",
  "14xl": "text-6xl font-bold md:text-[52px] sm:text-[46px]",
  "13xl": "text-[50px] font-bold md:text-[46px] sm:text-[40px]",
  xl: "text-base font-semibold",
  s: "text-[10px] font-semibold",
  md: "text-[11px] font-semibold",
  "12xl": "text-5xl font-bold md:text-[44px] sm:text-[38px]",
  xs: "text-[8px] font-semibold",
  lg: "text-sm font-semibold",
  "11xl": "text-[44px] font-semibold md:text-[40px] sm:text-[34px]",
  "10xl": "text-[40px] font-bold md:text-[38px] sm:text-4xl",
};

export type HeadingProps = Partial<{
  className: string;
  as: any;
  size: keyof typeof sizes;
}> &
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  >;

const Heading: React.FC<React.PropsWithChildren<HeadingProps>> = ({
  children,
  className = "",
  size = "5xl",
  as,
  ...restProps
}) => {
  const Component = as || "h6";

  return (
    <Component
      className={`font-poppins ${className} ${sizes[size]}`}
      {...restProps}
    >
      {children}
    </Component>
  );
};

export { Heading };
