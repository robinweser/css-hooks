import { O, U } from "ts-toolbelt";
import Typography from "./Typography";
import { CSSProperties, ComponentProps, ReactElement, forwardRef } from "react";
import { exhausted } from "@/util/exhausted";
import hooks from "@/css-hooks";

export type ForwardProps = {
  className?: string;
  style?: CSSProperties;
};

export type Props = U.Strict<
  | ComponentProps<"a">
  | { children: (forwardProps: ForwardProps) => ReactElement }
> & {
  theme?: "blue" | "gray";
  ofGroup?: boolean;
};

export default forwardRef<HTMLAnchorElement, O.Omit<Props, "ref">>(
  function CtaButton(
    { children, className = "", theme = "blue", ofGroup, style, ...restProps },
    ref,
  ) {
    return (
      <Typography variant="boldLarge">
        {({
          className: typographyClassName = "",
          style: typographyStyle,
          ...typographyRest
        }) => {
          exhausted(typographyRest);

          const forwardProps: ForwardProps = {
            className: `${className} ${typographyClassName}`,
            style: hooks({
              ...typographyStyle,
              textDecoration: "none",
              background: `var(--${
                theme === "blue" ? "blue-800" : "gray-500"
              })`,
              dark: {
                background: `var(--${theme}-800)`,
              },
              color: "var(--white)",
              padding: "0.5em 0.75em",
              display: "inline-block",
              hover: {
                background: "var(--blue-700)",
              },
              active: {
                background: "var(--red-700)",
              },
              ...style,
            }),
          };

          return typeof children === "function" ? (
            children(forwardProps)
          ) : (
            <a {...forwardProps} {...restProps} ref={ref}>
              {children}
            </a>
          );
        }}
      </Typography>
    );
  },
);