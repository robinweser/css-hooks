import { CSSProperties, ComponentProps, ReactElement, forwardRef } from "react";
import { Inconsolata, Inter } from "next/font/google";
import { O, U } from "ts-toolbelt";
import { css } from "@/css";

export type ForwardProps = {
  className?: string;
  style?: CSSProperties;
};

const inter = Inter({ subsets: ["latin"] });
const inconsolata = Inconsolata({ subsets: ["latin"], weight: ["400"] });

function makeStyle(fontSizeRem: number, fontWeight: 400 | 700 = 400) {
  const marginBlock = `${1.5 / fontSizeRem}rem`;
  return {
    fontSize: `${fontSizeRem}rem`,
    fontWeight,
    lineHeight: 1.5,
    marginBlock,
  };
}

const variantStyles = {
  regularSmallCaps: makeStyle(0.667),
  regularBase: makeStyle(1, 400),
  boldBase: makeStyle(1, 700),
  boldLarge: makeStyle(1.333, 700),
  regularXL: makeStyle(1.667),
  regular2XL: makeStyle(2),
  bold2XL: makeStyle(2, 700),
  regular3XL: makeStyle(2.333),
  bold3XL: makeStyle(2.333, 700),
  regular4XL: makeStyle(3),
} as const;

export type Props = {
  margins?: boolean;
  variant?: keyof typeof variantStyles | "codeBase";
} & U.Strict<
  | ComponentProps<"span">
  | {
      children?: (forwardProps: ForwardProps) => ReactElement;
    }
>;

export default forwardRef<HTMLSpanElement, O.Omit<Props, "ref">>(
  function Typography(
    {
      children,
      className = "",
      margins,
      style,
      variant = "regularBase",
      ...restProps
    },
    ref,
  ) {
    const forwardProps: ForwardProps = {
      className: `${className} ${
        variant === "codeBase" ? inconsolata.className : inter.className
      }`,
      style: css(
        variantStyles[variant === "codeBase" ? "regularBase" : variant],
        {
          textTransform:
            variant === "regularSmallCaps" ? "uppercase" : undefined,
          letterSpacing:
            variant === "codeBase" || variant === "regularBase"
              ? undefined
              : variant === "regularSmallCaps"
              ? "0.1em"
              : "-0.03em",
        },
        margins ? { display: "block" } : { margin: 0, marginBlock: 0 },
        style,
      ),
    };
    return typeof children === "function" ? (
      children(forwardProps)
    ) : (
      <span {...forwardProps} {...restProps} ref={ref}>
        {children}
      </span>
    );
  },
);
