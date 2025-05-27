import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { UseFormReturn } from "react-hook-form";

interface ShadSelectProps {
  name: string;
  label: string;
  form: UseFormReturn<any>;
  options: {
    value: string;
    label: string;
  }[];
  defaultValue?: string;
  disabled?: boolean;
}

function ShadSelect({
  form,
  label,
  options,
  name,
  defaultValue,
  disabled,
}: ShadSelectProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {/* <FormLabel>Email</FormLabel> */}
          <Select
            disabled={disabled}
            onValueChange={field.onChange}
            defaultValue={defaultValue || field.value}
          >
            <FormControl>
              <SelectTrigger className="border shadow-none text-primary h-11 border-primary rounded-xl focus-within:right-1 focus-within:ring-primary">
                <SelectValue placeholder={label} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="max-h-[200px] ">
              {options.map((item) => (
                <SelectItem
                  className="h-11 "
                  key={item.value}
                  value={item.value}
                >
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default ShadSelect;
