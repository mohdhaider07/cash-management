import { TextareaHTMLAttributes, useId, forwardRef, Ref } from "react";
import { FieldError } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { Textarea } from "@/components/ui/textarea";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  rows: number;
  error?: FieldError;
  className?: string;
}

const CustomTextArea = (
  { label, rows, error, className, disabled, ...rest }: Props,
  ref: Ref<HTMLTextAreaElement>
) => {
  const id = useId();

  const isRtl = document.dir === "rtl";

  return (
    <>
      <label
        htmlFor={id}
        className={twMerge(
          `relative block overflow-hidden rounded-md border ${
            error
              ? "border-red-600 focus-within:border-red-600 focus-within:ring-red-600 dark:border-red-600"
              : "border-primary focus-within:border-primary focus-within:ring-primary dark:border-gray-700"
          } focus-within:ring-1 rounded-xl dark:bg-gray-800/25`,
          disabled && "opacity-50 cursor-not-allowed",
          className // Apply className to the wrapper
        )}
      >
        <Textarea
          ref={ref}
          id={id}
          placeholder={""}
          rows={rows}
          disabled={disabled}
          {...rest}
          className={twMerge(
            `peer px-3 mt-5 w-full border-none placeholder-transparent dark:text-white sm:text-sm min-h-[100px]`,
            className // Apply className to the Textarea
          )}
        />

        {/* Floating Label */}
        <span
          className={twMerge(
            `absolute ${
              isRtl ? "right-3" : "left-3"
            } rtl:right-3 top-3 -translate-y-1/2 text-xs text-primary transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs dark:text-gray-200 md:text-sm`
          )}
        >
          {label}
        </span>
      </label>

      {/* Error Message */}
      {error && <p className="text-xs text-destructive">{error.message}</p>}
    </>
  );
};

export default forwardRef(CustomTextArea);
