// components/Breadcrumb.tsx
"use client";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

export const Breadcrumb = ({
  items,
}: {
  items: { label: string; path?: string; active?: boolean }[];
}) => {
  const navigate = useNavigate();

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 text-sm text-slate-400">
        {items.map((item, index) => (
          <>
            <span
              className={cn(
                "cursor-pointer hover:text-primary transition-colors",
                item.active ? "text-primary " : ""
              )}
              onClick={() => item.path && navigate(item.path)}
              role="button"
              tabIndex={0}
            >
              {item.label}
            </span>
            {index < items.length - 1 && (
              <span className="text-slate-400">{">"}</span>
            )}
          </>
        ))}
      </div>
    </div>
  );
};
