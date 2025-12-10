import React, { ReactNode, ComponentProps } from "react";
import { Slot } from "@radix-ui/react-slot";
import { usePressed } from "../../hooks/usePressed";
import clsx from "clsx";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva("c-button", {
  variants: {
    variant: {
      primary: "c-button--primary",
      danger: "c-button--danger",
      dangerSoft: "c-button--danger-soft",
      secondary: "c-button--secondary",
      tertiary: "c-button--tertiary",
      outline: "c-button--outline",
      ghost: "c-button--ghost",
    },
    size: {
      // default: "c-button--default",
      // sm: "c-button--sm",
      // lg: "c-button--lg",
      icon: "c-button--icon-only",
      // "icon-sm": "c-button--icon-sm",
      // "icon-lg": "c-button--icon-lg",
    },
  },
  defaultVariants: {
    variant: "primary",
    // size: "default",
  },
});

const Button = ({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) => {
  const { isPressed, pressHandlers } = usePressed();

  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={clsx(buttonVariants({ variant, size, className }))}
      data-pressed={isPressed}
      {...pressHandlers}
      {...props}
    />
  );
};

export default Button;
