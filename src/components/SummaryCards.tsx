import React from "react";
import { SummaryCard, SummaryCardSkeleton } from "./SummaryCard";
import { TotalCollectionIcon } from "./icons/TotalCollectionIcon";
import { TotalDepositIcon } from "./icons/TotalDepositIcon";
import { DifferenceAmountIcon } from "./icons/DifferenceAmountIcon";
import { useGetSummaryStatsQuery } from "@/redux/features/apis/adminApi";

export const SummaryCards: React.FC = () => {
  const { data: stats, isLoading, error } = useGetSummaryStatsQuery();

  const summaryData = [
    {
      icon: <TotalCollectionIcon size={90} />,
      title: "Total Collection (MM)",
      subtitle: "(All Locations)",
      value: `₹${stats?.totalCollection.toLocaleString() ?? 0}`,
    },
    {
      icon: <TotalDepositIcon size={90} />,
      title: "Total Deposit Amount",
      subtitle: "(All Locations)",
      value: `₹${stats?.totalDeposit.toLocaleString() ?? 0}`,
      valueColor: "text-success",
    },
    {
      icon: <DifferenceAmountIcon size={90} />,
      title: "Difference Amount",
      subtitle: "(All Locations)",
      value: `₹${stats?.difference.toLocaleString() ?? 0}`,
      valueColor:
        (stats?.difference ?? 0) < 0 ? "text-success" : "text-destructive",
    },
  ];

  return (
    <div className="flex items-center gap-4 mb-8">
      {isLoading ? (
        <>
          {" "}
          <SummaryCardSkeleton />
          <SummaryCardSkeleton />
          <SummaryCardSkeleton />
        </>
      ) : (
        summaryData.map((card, index) => (
          <SummaryCard
            key={index}
            icon={<div className="p-3 rounded-lg">{card.icon}</div>}
            title={card.title}
            subtitle={card.subtitle}
            value={card.value}
            valueColor={card.valueColor}
          />
        ))
      )}
    </div>
  );
};
