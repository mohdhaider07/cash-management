import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import type { InputHTMLAttributes } from "react";
import type { FieldError } from "react-hook-form";

interface Props
  extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string | React.ReactNode;
  error?: FieldError;
  icon?: any;
  variant?: "1" | "2";
  showClearButton?: boolean;
  capitalize?: boolean;
}

const Input = (
  {
    label: finalLabel,
    error,
    icon,
    variant = "1",
    disabled = false,
    className = "",
    showClearButton = false,
    capitalize = false,
    ...rest
  }: Props,
  ref: any
) => {
  let variantClassName = "";
  let variantLabelClassName = "";
  const isRtl = document.dir === "rtl";

  if (variant === "1") {
    variantClassName = twMerge(
      error
        ? "border-destructive focus:border-destructive focus:ring-destructive dark:border-destructive"
        : "border-input focus:border-primary focus:ring-primary dark:border-input"
    );
    variantLabelClassName = "text-foreground";
  } else {
    variantClassName = twMerge(
      error
        ? "border-destructive focus:border-destructive focus:ring-destructive dark:border-destructive"
        : "border-input focus:border-primary focus:ring-primary dark:border-input"
    );
    variantLabelClassName = "text-foreground";
  }

  className = twMerge(variantClassName, className);

  return (
    <>
      <label
        htmlFor={rest.id}
        className={twMerge(
          `autofill:bg-red-500 relative block overflow-hidden rounded-md border ${
            error
              ? "border-destructive focus-within:border-destructive focus-within:ring-destructive dark:border-destructive"
              : "border-input focus-within:border-primary focus-within:ring-primary dark:border-input"
          } focus-within:ring-1 rounded-lg dark:bg-muted/25`,
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
      >
        <input
          ref={ref}
          type={rest.type || "text"}
          id={rest.id}
          placeholder={
            rest.type === "search"
              ? "Search..."
              : typeof finalLabel === "string"
              ? finalLabel
              : "Search..."
          }
          className={twMerge(
            `peer px-3 pt-4 h-11 w-full border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 dark:text-foreground sm:text-sm`
          )}
          style={{ lineHeight: "1.5" }}
          disabled={disabled}
          onChange={rest.onChange}
          onBlur={rest.onBlur}
          {...rest}
        />

        <span
          className={twMerge(
            `absolute left-3 top-3 rtl:right-3 -translate-y-1/2 text-xs text-muted-foreground transition-all pointer-events-none
            peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs 
            dark:text-muted-foreground flex items-center gap-1
            [&>svg]:w-4 [&>svg]:h-4 peer-focus:[&>svg]:w-4 peer-focus:[&>svg]:h-4
            peer-placeholder-shown:[&>svg]:w-5 peer-placeholder-shown:[&>svg]:h-5`,
            variantLabelClassName,
            icon ? (isRtl ? "mr-10" : "ml-10") : ""
          )}
        >
          {finalLabel}
        </span>
      </label>

      {error && <p className="text-xs  text-destructive">{error.message}</p>}
    </>
  );
};

// Wrap in forwardRef to allow ref to be passed
export default forwardRef(Input);
