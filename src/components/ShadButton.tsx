import React from "react";
import { Button, ButtonProps } from "./ui/button";
import { Loader2 } from "lucide-react";

interface ShadButtonProps extends ButtonProps {
  loading?: boolean;
}

const ShadButton: React.FC<ShadButtonProps> = ({
  children,
  loading = false,
  disabled,
  ...props
}) => {
  return (
    <Button
      {...props}
      disabled={disabled || loading}
      className="[&_svg]:size-6 w-full "
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <Loader2 className="text-primary-foreground animate-spin" />
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default ShadButton;
