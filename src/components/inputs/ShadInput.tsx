import React, { useState } from "react";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import CustomInput from "./CustomInput";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface ShadInputProps {
  name: string;
  form: UseFormReturn<any>;
  label?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  type?: string;
  maxLength?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onPaste?: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const ShadInput = ({
  label,
  name,
  form,
  placeholder,
  type,
  style,
  maxLength,
  onChange,
  onBlur,
  onKeyDown,
  onPaste,
  disabled = false,
}: ShadInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col w-full gap-1 space-y-0">
          <div className={"w-full flex flex-col space-y-0 gap-1"}>
            <FormControl className="flex-1" id={name}>
              <div className="relative">
                <CustomInput
                  label={label || name || ""}
                  type={type || "text"}
                  style={style}
                  placeholder={placeholder || label}
                  {...field}
                  onChange={onChange || field.onChange}
                  onBlur={onBlur || field.onBlur}
                  disabled={disabled}
                />

                {type === "password" && (
                  <div
                    className={`absolute top-1/2 -translate-y-1/2 ${
                      document.dir === "rtl" ? "left-1" : "right-1"
                    } 
                    text-primary cursor-pointer rounded-full p-2 hover:bg-slate-200`}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeIcon size={20} />
                    ) : (
                      <EyeOffIcon size={20} />
                    )}
                  </div>
                )}
              </div>
            </FormControl>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};

export default ShadInput;
