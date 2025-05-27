import { Breadcrumb } from "@/components/Breadcrumb";
import { SummaryCards } from "@/components/SummaryCards";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetSummaryStatsQuery } from "@/redux/features/apis/adminApi";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function DashboardFragment() {
  const { data: summaryStats } = useGetSummaryStatsQuery();
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    if (summaryStats) {
      setChartData([
        { name: "Total Collection", value: summaryStats.totalCollection },
        { name: "Total Deposit", value: summaryStats.totalDeposit },
        { name: "Difference", value: summaryStats.difference },
      ]);
    }
  }, [summaryStats]);

  return (
    <>
      <Breadcrumb items={[{ label: "Dashboard", active: true }]} />
      <SummaryCards />
      {/*  we can add employee details here */}
      <div>we can show employee details here in the table</div>
    </>
  );
}

export default DashboardFragment;
