import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { LayoutDashboard, FileSpreadsheet, Receipt } from "lucide-react";
import { cn } from "@/lib/utils";
import ShadTooltip from "@/components/ShadTooltip";

export enum Tab {
  Dashboard = "dashboard",
  Outstanding_Report = "outstanding-report",
  Payment_Report = "payment-report",
}

const Admin: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const tab = location.pathname.split("/").pop();
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if (tab === "admin" || tab === "admin/" || tab === "") {
      navigate(`/admin/${Tab.Dashboard}`);
    }
  }, [tab, navigate]);

  // Determine the title based on current tab
  const getTitle = () => {
    switch (tab) {
      case Tab.Dashboard:
        return "Dashboard";
      case Tab.Outstanding_Report:
        return "Outstanding Report (All Locations)";
      case Tab.Payment_Report:
        return "Payment Report";
      default:
        return "Dashboard";
    }
  };

  // Navigation items with icons
  const navItems = [
    {
      icon: <LayoutDashboard className="h-5 w-5" />,
      label: "Dashboard",
      tab: Tab.Dashboard,
    },
    {
      icon: <FileSpreadsheet className="h-5 w-5" />,
      label: "Outstanding Report",
      tab: Tab.Outstanding_Report,
    },
    {
      icon: <Receipt className="h-5 w-5" />,
      label: "Payment Report",
      tab: Tab.Payment_Report,
    },
  ];

  // Sidebar content based on current tab
  const getSidebarContent = () => {
    return (
      <div className="space-y-2">
        {navItems.map((item) => (
          <div key={item.tab}>
            <ShadTooltip
              label={
                <div
                  className={cn(
                    "flex items-center gap-3 text-primary font-medium cursor-pointer transition-all duration-200 p-2 rounded-md hover:bg-accent",
                    tab === item.tab
                      ? "bg-accent opacity-100"
                      : "opacity-70 hover:opacity-100"
                  )}
                  onClick={() => navigate(`/admin/${item.tab}`)}
                >
                  <div className="min-w-[20px]">{item.icon}</div>
                  <span className="transition-all duration-200 overflow-hidden whitespace-nowrap">
                    {item.label}
                  </span>
                </div>
              }
              info={item.label}
              showTooltip={isCollapsed}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <DashboardLayout
      title={getTitle()}
      sidebarContent={getSidebarContent()}
      onSidebarCollapse={setIsCollapsed}
    >
      <div className="flex flex-col gap-4">
        <Outlet />
      </div>
    </DashboardLayout>
  );
};

export default Admin;
