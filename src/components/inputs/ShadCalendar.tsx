import React from "react";
import { Controller, Control, FieldError } from "react-hook-form";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

interface ShadCalendarProps {
  name: string;
  control: Control<any>;
  label?: string;
  error?: FieldError;
  placeholder?: string;
}

const ShadCalendar: React.FC<ShadCalendarProps> = ({
  name,
  control,
  label,
  error,
  placeholder = "Pick a date",
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const value = field.value ? new Date(field.value) : undefined;
        return (
          <div className="flex flex-col gap-1">
            {label && (
              <label className="text-sm font-medium mb-1">{label}</label>
            )}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={
                    "w-full justify-start text-left font-normal" +
                    (error ? " border-red-500" : "")
                  }
                  type="button"
                >
                  {value ? (
                    format(value, "yyyy-MM-dd")
                  ) : (
                    <span className="text-muted-foreground">{placeholder}</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={value}
                  onSelect={(date) => {
                    field.onChange(date ? format(date, "yyyy-MM-dd") : "");
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {error && (
              <span className="text-xs text-red-500 mt-1">{error.message}</span>
            )}
          </div>
        );
      }}
    />
  );
};

export default ShadCalendar;
