import React, { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import clsx from "clsx";

interface BaseProps {
  label: string;
  name: string;
  error?: string;
  className?: string;
}

type InputProps = BaseProps &
  InputHTMLAttributes<HTMLInputElement> & { as?: "input" };
type TextareaProps = BaseProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & { as: "textarea" };

type InputFieldProps = InputProps | TextareaProps;

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  error,
  className,
  as = "input",
  ...props
}) => {
  return (
    <div className={clsx("text-field", className)} data-invalid={!!error}>
      <label htmlFor={name} className="c-label">
        {label}
      </label>
      {as === "textarea" ? (
        <textarea
          className="c-textarea"
          data-invalid={!!error}
          {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          className="c-input"
          data-invalid={!!error}
          {...(props as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      {error && (
        <span className="field-error" data-visible={!!error}>
          {error}
        </span>
      )}
    </div>
  );
};

export default InputField;
