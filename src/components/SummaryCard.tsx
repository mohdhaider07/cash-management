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
  <Card className="w-fit">
    <CardContent className="px-2 py-1 w-fit">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-muted animate-pulse" />
          <div>
            <div className="w-20 h-3 mb-1 rounded bg-muted animate-pulse" />
            <div className="w-16 h-2 mb-1 rounded bg-muted animate-pulse" />
            <div className="w-24 h-6 rounded bg-muted animate-pulse" />
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
