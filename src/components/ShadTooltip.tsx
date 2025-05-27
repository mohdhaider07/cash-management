import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ShadTooltipProps {
  label: React.ReactNode;
  info: string;
  showTooltip?: boolean;
  side?: "top" | "right" | "bottom" | "left";
  delayDuration?: number;
}

function ShadTooltip({
  label,
  info,
  showTooltip = true,
  side = "right",
  delayDuration = 0,
}: ShadTooltipProps) {
  if (!showTooltip) {
    return <>{label}</>;
  }

  return (
    <TooltipProvider delayDuration={delayDuration}>
      <Tooltip>
        <TooltipTrigger asChild>{label}</TooltipTrigger>
        <TooltipContent
          side={side}
          className="p-2 text-sm bg-background text-foreground rounded-lg shadow-md border border-border"
        >
          <p>{info}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default ShadTooltip;
