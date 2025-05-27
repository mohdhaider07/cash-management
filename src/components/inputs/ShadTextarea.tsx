import React from "react";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import CustomTextArea from "./CustomTextArea";
import { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

interface ShadTextAreaProps {
  name: string;
  form: UseFormReturn<any>;
  label?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  rows: number;
  dir?: "ltr" | "rtl";
  maxLength?: number;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
}

const ShadTextArea = ({
  name,
  form,
  label,
  rows,
  dir,
  style,
  maxLength,
  onChange,
  onKeyDown,
  className,
  disabled = false,
}: ShadTextAreaProps) => {
  const { i18n } = useTranslation();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col w-full gap-1 space-y-0">
          <div className="w-full flex flex-col space-y-0 gap-1">
            <FormControl className="flex-1" id={name}>
              <CustomTextArea
                label={label || name || ""}
                style={style}
                rows={rows}
                {...field}
                dir={i18n.language === "ar" ? "rtl" : "ltr"}
                onChange={onChange || field.onChange}
                maxLength={maxLength}
                onKeyDown={onKeyDown}
                className={twMerge("min-h-[100px]", className)} // Default height with overrides
                disabled={disabled}
              />
            </FormControl>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};

export default ShadTextArea;
