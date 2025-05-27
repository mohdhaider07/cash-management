import { useState } from "react";
import { Controller } from "react-hook-form";
import { format } from "date-fns";
import { Calendar as CalendarIcon, X } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FormControl, FormItem, FormMessage } from "./ui/form";

interface DateRangeSelectorProps {
  name?: string;
  control: any;
  label?: string;
  disabled?: boolean;
  numberOfMonths?: number;
  disablePastDates?: boolean;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  popoverContainer?: HTMLElement | null;
}

const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({
  control,
  onOpenChange,
  open,
  popoverContainer,
}) => {
  const [calendarOpen, setCalendarOpen] = useState(open || false);

  const handleOpenChange = (newOpen: boolean) => {
    setCalendarOpen(newOpen);
    if (onOpenChange) {
      onOpenChange(newOpen);
    }
  };

  return (
    <Controller
      control={control}
      name="dateRange"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <Popover
            open={calendarOpen}
            onOpenChange={handleOpenChange}
            modal={true}
          >
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  type="button"
                  variant="outline"
                  className={cn(
                    "w-full h-10 justify-start focus-within:ring-1 border-primary focus-within:ring-primary text-left text-primary font-normal",
                    !field.value?.from && "text-muted-foreground"
                  )}
                >
                  {field.value?.from ? (
                    field.value.to ? (
                      <>
                        {format(field.value.from, "LLL dd, y")} -{" "}
                        {format(field.value.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(field.value.from, "LLL dd, y")
                    )
                  ) : (
                    <span className="text-primary">Pick a date range</span>
                  )}
                  <CalendarIcon className="w-4 h-4 ml-auto text-primary" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-0"
              align="center"
              side="bottom"
              sideOffset={5}
              {...(popoverContainer ? { container: popoverContainer } : {})}
            >
              <div className="flex flex-col">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={field.value?.from || new Date()}
                  selected={field.value}
                  onSelect={(range) => {
                    field.onChange(range);
                  }}
                  numberOfMonths={2}
                  disabled={(date) => date < new Date()}
                  className="border rounded-md"
                />
                <div className="flex justify-end p-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="px-2 text-xs h-7"
                    onClick={() => {
                      console.log("first");
                      field.onChange(undefined);
                    }}
                    disabled={!field.value}
                  >
                    <X className="w-3 h-3 mr-1" />
                    Reset
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DateRangeSelector;
