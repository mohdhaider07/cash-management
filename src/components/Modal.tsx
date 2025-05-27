import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  size?: "default" | "small" | "medium" | "large";
  open: boolean;
  setOpen: (open: boolean) => void;
  hideClose?: boolean;
  children: React.ReactNode;
  title?: string;
}

function Modal({
  className,
  size = "default",
  hideClose = true,
  open,
  setOpen,
  children,
  title,
}: Props) {
  const [dialogContentEl, setDialogContentEl] =
    React.useState<HTMLDivElement | null>(null);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          ref={setDialogContentEl}
          onOpenAutoFocus={(e) => e.preventDefault()}
          className={cn(
            "max-h-[90vh]   overflow-y-auto",
            size === "small" && "sm:min-w-[600px]",
            size === "medium" && "sm:max-w-[800px]",
            size === "large" && "sm:max-w-[1000px] md:w-[95vw] w-[98vw]",
            className
          )}
        >
          {!hideClose && <DialogClose />}
          {title && (
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold border-b border-primary md:text-2xl text-primary">
                {title}
              </DialogTitle>
            </DialogHeader>
          )}
          {/* Only render children when ref is set */}
          {dialogContentEl && React.isValidElement(children) ? (
            React.cloneElement(children as React.ReactElement<any>, {
              popoverContainer: dialogContentEl,
            })
          ) : (
            <div style={{ minHeight: 100 }} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Modal;
