// components/SummaryCard.tsx
"use client";
import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SummaryCardProps = {
  icon: ReactNode;
  title: string;
  subtitle: string;
  value: string;
  valueColor?: string;
  button?: ReactNode;
};
export const SummaryCardSkeleton = () => (
  <Card className="w-full max-w-xs">
    <CardContent className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 rounded-full bg-muted animate-pulse" />
          <div>
            <div className="w-24 h-4 mb-2 rounded bg-muted animate-pulse" />
            <div className="w-20 h-3 mb-2 rounded bg-muted animate-pulse" />
            <div className="rounded w-28 h-7 bg-muted animate-pulse" />
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export const SummaryCard = ({
  icon,
  title,
  subtitle,
  value,
  valueColor = "text-foreground",
  button,
}: SummaryCardProps) => (
  <Card className="w-fit">
    <CardContent className="px-2 py-1 w-fit">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <div>
            <p className="mb-1 text-xs font-semibold text-slate">{title}</p>
            <p className="mb-1 text-[11px] font-semibold text-slate">
              {subtitle}
            </p>
            <p className={cn("text-lg font-bold", valueColor)}>{value}</p>
          </div>
        </div>
        {button}
      </div>
    </CardContent>
  </Card>
);
