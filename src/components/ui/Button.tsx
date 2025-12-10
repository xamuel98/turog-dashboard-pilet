import React, { ComponentProps } from "react";
import clsx from "clsx";
import { usePressed } from "../../hooks/usePressed";

const Button = ({ className, ...props }: ComponentProps<"button">) => {
  const { isPressed, pressHandlers } = usePressed();

  return (
    <button
      data-slot="button"
      className={clsx(className)}
      data-pressed={isPressed}
      {...pressHandlers}
      {...props}
    />
  );
};

export default Button;
