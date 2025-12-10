import React, { ComponentProps } from "react";
import clsx from "clsx";

interface BaseProps {
  label?: string;
  name?: string;
  error?: string;
  className?: string;
  prepend?: React.ReactNode;
  append?: React.ReactNode;
  variant?: "default" | "filled";
}

type InputFieldProps = BaseProps &
  (
    | ({ as?: "input" } & ComponentProps<"input">)
    | ({ as: "textarea" } & ComponentProps<"textarea">)
  );

const InputField = ({
  label,
  name,
  error,
  className,
  as = "input",
  prepend,
  append,
  variant = "default",
  ...props
}: InputFieldProps) => {
  const hasIcons = prepend || append;

  return (
    <div className={clsx("text-field", className)} data-invalid={!!error}>
      {label && (
        <label htmlFor={name} className="c-label">
          {label}
        </label>
      )}

      <div className={clsx("c-input-wrapper", { "has-icons": hasIcons })}>
        {prepend && <div className="c-input-prepend">{prepend}</div>}

        {as === "textarea" ? (
          <textarea
            className={clsx("c-textarea", `c-textarea--${variant}`)}
            id={name}
            name={name}
            {...(props as ComponentProps<"textarea">)}
          />
        ) : (
          <input
            className={clsx("c-input", `c-input--${variant}`)}
            id={name}
            name={name}
            {...(props as ComponentProps<"input">)}
          />
        )}

        {append && <div className="c-input-append">{append}</div>}
      </div>

      {error && (
        <span className="field-error" data-visible="true">
          {error}
        </span>
      )}
    </div>
  );
};

export default InputField;
