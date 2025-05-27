import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React from "react";

interface LoaderProps {
  size?: number;
  fillParent?: boolean;
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({
  className,
  size,
  fillParent = false,
}) => {
  return (
    <div
      className={`flex justify-center items-center ${
        fillParent ? "h-screen" : ""
      }`}
    >
      <Loader2
        className={cn(`animate-spin text-primary`, className)}
        style={
          size
            ? {
                height: `${size / 4}rem`,
                width: `${size / 4}rem`,
              }
            : {}
        }
      />
    </div>
  );
};

export default Loader;
