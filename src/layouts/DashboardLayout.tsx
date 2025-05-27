// layouts/DashboardLayout.tsx
"use client";
import { ReactNode, useState } from "react";
import { Header } from "@/components/Header";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardLayoutProps {
  title: string;
  children: ReactNode;
  sidebarContent: ReactNode;
  onSidebarCollapse?: (collapsed: boolean) => void;
}

export const DashboardLayout = ({
  title,
  children,
  sidebarContent,
  onSidebarCollapse,
}: DashboardLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const handleCollapse = (value: boolean) => {
    setCollapsed(value);
    onSidebarCollapse?.(value);
  };

  return (
    <div className="min-h-screen bg-background-foreground">
      <Header title={title} />

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={cn(
            "bg-background  min-h-screen transition-all duration-300 relative",
            collapsed ? "w-16" : "w-64"
          )}
        >
          {/* Toggle button */}
          <Button
            variant={"ghost"}
            size="icon"
            className="absolute z-0 border rounded-full shadow-sm -right-3 top-3 bg-background hover:bg-accent"
            onClick={() => handleCollapse(!collapsed)}
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </Button>

          <div
            className={cn(
              "transition-all duration-300 overflow-hidden",
              collapsed ? "px-2 py-4" : "p-6"
            )}
          >
            {sidebarContent}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};
