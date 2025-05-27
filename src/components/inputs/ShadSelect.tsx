// import { useController, useFormContext } from "react-hook-form";
// import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "@/components/ui/select";

// interface ShadSelectProps {
//     name: string;
//     label: string;
//     options: { value: string; label: string }[];
//     onChange?: (value: string) => void;
// }

// const ShadSelect = ({ name, options, label, onChange }: ShadSelectProps) => {
//     const { control } = useFormContext();
//     const { field } = useController({ name, control });

//     return (
//         <Select
//             value={field.value}
//             onValueChange={(value: string) => {
//                 field.onChange(value);
//                 if (onChange) onChange(value);
//             }}
//         >
//             <SelectTrigger className="w-full py-5 border rounded-md">
//                 <SelectValue placeholder={label} />
//             </SelectTrigger>
//             <SelectContent>
//                 {options.map((option) => (
//                     <SelectItem key={option.value} value={option.value}>
//                         {option.label}
//                     </SelectItem>
//                 ))}
//             </SelectContent>
//         </Select>
//     );
// };

// export default ShadSelect;

import { useFormContext } from "react-hook-form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useTranslation } from "react-i18next";

interface ShadSelectProps {
  name: string;
  label?: string;
  options: { value: string; label: string }[];
  onChange?: (value: string) => void;
}

const ShadSelect = ({ name, options, label, onChange }: ShadSelectProps) => {
  const { control } = useFormContext();
  const { i18n } = useTranslation();
  const lng = i18n.language;
  const isRTL = lng == "ar";

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormControl>
            <Select
              value={field.value}
              onValueChange={(value: string) => {
                field.onChange(value);
                if (onChange) onChange(value);
              }}
            >
              <SelectTrigger className="flex w-full py-3 text-sm border h-11 rtl:flex-row-reverse rounded-xl text-primary border-primary focus-within::ring-primary focus-within:ring-1 dark:border-gray-700">
                <SelectValue
                  placeholder={
                    <span className={`${isRTL && "font-arabic"}`}>{label}</span>
                  }
                  // style={{ lineHeight: "1.5" }}
                />
              </SelectTrigger>
              <SelectContent className="max-h-[200px] rounded-xl overflow-y-auto">
                {options.map((option) => (
                  <SelectItem
                    className="text-sm text-primary h-11 rounded-xl rtl:flex-row-reverse"
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage></FormMessage>
        </FormItem>
      )}
    />
  );
};

export default ShadSelect;
