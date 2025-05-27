import React, { ReactNode } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

type SizeType = "default" | "sm" | "lg" | "xl" | "full";

interface ShadDrawerProps {
  trigger: ReactNode;
  title?: string;
  description?: string;
  children?: ReactNode;
  submitText?: string;
  cancelText?: string;
  onSubmit?: () => void;
  position?: "top" | "bottom" | "left" | "right";
  showFooter?: boolean;
  className?: string;
  size?: SizeType | { base: SizeType; md?: SizeType; lg?: SizeType };
  showClose?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

/**
 * ShadDrawer - A reusable drawer component based on Shadcn UI
 *
 * @param {ReactNode} trigger - Element that triggers the drawer
 * @param {string} title - Title of the drawer
 * @param {string} description - Description text below the title
 * @param {ReactNode} children - Content to be displayed in the drawer body
 * @param {string} submitText - Text for the submit button
 * @param {string} cancelText - Text for the cancel button
 * @param {Function} onSubmit - Function called when submit is clicked
 * @param {string} position - Position of the drawer ('top', 'bottom', 'left', 'right', 'center')
 * @param {boolean} showFooter - Whether to show the footer with buttons
 * @param {string} className - Additional CSS classes for the drawer
 * @param {string|object} size - Size of the drawer ('default', 'sm', 'lg', 'xl', 'full') or responsive object
 * @param {boolean} showClose - Whether to show a close button in the header
 * @param {boolean} open - Whether the drawer is open
 * @param {Function} onOpenChange - Function called when the drawer open state changes
 */
const ShadDrawer: React.FC<ShadDrawerProps> = ({
  trigger,
  title,
  description,
  children,
  submitText = "Submit",
  cancelText = "Close",
  onSubmit,
  position = "right",
  showFooter = false,
  className = "",
  size = "default",
  showClose = false,
  open,
  onOpenChange,
}) => {
  // Determine size-based classes
  const sizeClasses = {
    default: "max-w-md",
    sm: "max-w-sm",
    lg: "max-w-lg",
    xl: "max-w-xl",
    full: "max-w-full",
  };

  // Handle responsive sizes
  let sizeClass = "";
  if (typeof size === "string") {
    sizeClass = sizeClasses[size];
  } else {
    // Build responsive classes
    sizeClass = sizeClasses[size.base]; // Base size
    if (size.md) {
      sizeClass += ` md:${sizeClasses[size.md]}`;
    }
    if (size.lg) {
      sizeClass += ` lg:${sizeClasses[size.lg]}`;
    }
  }

  // Determine position-based classes
  const positionClasses = {
    top: "h-auto top-0 border-b rounded-t-[inherit]",
    bottom: "h-auto bottom-0 border-t rounded-b-[inherit]",
    left: "h-full w-auto inset-y-0 left-0 border-r rounded-l-[inherit]",
    right: "h-full w-auto inset-y-0 right-0 border-l rounded-r-[inherit]",
  };

  const { i18n } = useTranslation(); // Get current language
  const isRTL = i18n.language === "ar"; // Check if Arabic

  // Build the class string
  // const drawerClass = `${positionClasses[position]} ${sizeClass} ${className} `;
  const drawerClass = `${positionClasses[position]} ${isRTL ? "w-full !right-0 !left-auto" : sizeClass
    } ${className}`;

  // Handle submit click with optional onSubmit callback
  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit();
    }
  };

  console.log("showClose: ", showClose);

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className={drawerClass}>
        {/* {(title || description) && ( */}
        <DrawerHeader className="relative">
          {true && (
            <DrawerClose className="absolute top-[5%] left-[2%]">
              <span className="text-3xl cursor-pointer text-muted-foreground hover:text-primary">
                ✕
              </span>
            </DrawerClose>
          )}
          {title && <DrawerTitle>{title}</DrawerTitle>}
          {description && <DrawerDescription>{description}</DrawerDescription>}
        </DrawerHeader>
        {/* )} */}

        <div className="px-4 pb-6 overflow-x-auto">
          {children}

          {showFooter && (
            <DrawerFooter className="flex items-center justify-center gap-2 mt-8 ">
              {/* <Button onClick={handleSubmit}>{submitText}</Button> */}
              <DrawerClose className="w-full w-7xl">
                <Button variant="outline" className=" w-96">
                  {cancelText}
                </Button>
              </DrawerClose>
            </DrawerFooter>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ShadDrawer;
