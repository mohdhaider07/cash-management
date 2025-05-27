import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface Option {
  value: string;
  label: string;
}

interface ComboboxProps {
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  buttonClassName?: string;
  searchPlaceholder?: string;
}

export function ShadCombobox({
  options,
  value,
  onChange,
  placeholder = "Select...",
  buttonClassName = "w-[200px] justify-between",
  searchPlaceholder = "Search...",
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (selectedValue: string) => {
    let newValue: string[];
    if (selectedValue === "all") {
      newValue = ["all"];
    } else if (value.includes(selectedValue)) {
      newValue = value.filter((v) => v !== selectedValue && v !== "all");
      if (newValue.length === 0) newValue = ["all"];
    } else {
      newValue = value.filter((v) => v !== "all").concat(selectedValue);
    }
    onChange(newValue);
  };

  const displayLabel =
    value.includes("all") || value.length === 0
      ? placeholder
      : options
          .filter((option) => value.includes(option.value))
          .map((option) => option.label)
          .join(", ");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {/* <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={buttonClassName}
        >
          {displayLabel}
          <ChevronsUpDown className="opacity-50" />
        </Button> */}
        <button
          aria-expanded={open}
          role="combobox"
          className={cn(
            "flex items-center  text-center justify-center w-full",
            buttonClassName
          )}
        >
          Social
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={searchPlaceholder} className="h-9" />
          <CommandList>
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => handleSelect(option.value)}
                >
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto hover:bg-red-600",
                      value.includes(option.value) ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
