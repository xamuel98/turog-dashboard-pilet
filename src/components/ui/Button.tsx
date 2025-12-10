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
      icon: "c-button--icon-only",
    },
  },
  defaultVariants: {
    variant: "primary",
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
