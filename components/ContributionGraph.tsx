"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface ContributionDay {
  contributionCount: number;
  date: string;
  color: string;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface ContributionGraphProps {
  weeks: ContributionWeek[];
  totalContributions: number;
}

export default function ContributionGraph({
  weeks,
  totalContributions,
}: ContributionGraphProps) {
  const [hoveredDay, setHoveredDay] = useState<{
    date: string;
    count: number;
    x: number;
    y: number;
  } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dayLabels = ["Mon", "Wed", "Fri"];

  // Get month labels for the top
  const getMonthLabels = () => {
    const labels: { month: string; offset: number }[] = [];
    let currentMonth = -1;

    weeks.forEach((week, weekIndex) => {
      const firstDay = week.contributionDays[0];
      if (firstDay) {
        const date = new Date(firstDay.date);
        const month = date.getMonth();

        if (month !== currentMonth && weekIndex > 0) {
          labels.push({
            month: months[month],
            offset: weekIndex,
          });
          currentMonth = month;
        }
      }
    });

    return labels;
  };

  const monthLabels = getMonthLabels();

  return (
    <div className="w-full overflow-x-auto pb-1">
      <div className="w-full min-w-[600px]">
        {/* Total contributions */}
        <div className="mb-2 text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">
            {totalContributions}
          </span>{" "}
          contributions in the selected year
        </div>

        <div className="flex gap-2 w-full">
          {/* Day labels */}
          <div className="flex flex-col gap-[2px] pr-2 shrink-0">
            <div className="flex-1" /> {/* Sun - empty */}
            <div className="flex-1 flex items-center">
              <span className="text-[10px] text-muted-foreground">Mon</span>
            </div>
            <div className="flex-1" /> {/* Tue - empty */}
            <div className="flex-1 flex items-center">
              <span className="text-[10px] text-muted-foreground">Wed</span>
            </div>
            <div className="flex-1" /> {/* Thu - empty */}
            <div className="flex-1 flex items-center">
              <span className="text-[10px] text-muted-foreground">Fri</span>
            </div>
            <div className="flex-1" /> {/* Sat - empty */}
          </div>

          {/* Graph container */}
          <div className="flex-1 min-w-0">
            {/* Month labels */}
            <div className="relative mb-1 h-4 w-full">
              {monthLabels.map((label, idx) => (
                <div
                  key={idx}
                  className="absolute text-[11px] text-muted-foreground font-medium"
                  style={{
                    left: `${(label.offset / weeks.length) * 100}%`,
                  }}
                >
                  {label.month}
                </div>
              ))}
            </div>

            {/* Contribution squares */}
            <div className="flex gap-[2px] w-full">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-[2px] flex-1">
                  {week.contributionDays.map((day, dayIndex) => {
                    const date = new Date(day.date);
                    const level =
                      day.contributionCount === 0
                        ? 0
                        : day.contributionCount < 3
                          ? 1
                          : day.contributionCount < 6
                            ? 2
                            : day.contributionCount < 9
                              ? 3
                              : 4;

                    const colors = [
                      "bg-muted hover:bg-muted/80",
                      "bg-green-300 dark:bg-green-900/50 hover:bg-green-400 dark:hover:bg-green-800/60",
                      "bg-green-500 dark:bg-green-700/70 hover:bg-green-600 dark:hover:bg-green-600/80",
                      "bg-green-700 dark:bg-green-500/90 hover:bg-green-800 dark:hover:bg-green-400",
                      "bg-green-900 dark:bg-green-400 hover:bg-green-950 dark:hover:bg-green-300",
                    ];

                    return (
                      <motion.div
                        key={day.date}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          delay: (weekIndex * 7 + dayIndex) * 0.001,
                        }}
                        className={`w-full aspect-square max-w-[14px] rounded-sm ${colors[level]} cursor-pointer transition-all border border-transparent hover:border-foreground/20`}
                        onMouseEnter={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const tooltipData = {
                            date: date.toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }),
                            count: day.contributionCount,
                            x: rect.left + rect.width / 2,
                            y: rect.top,
                          };
                          setHoveredDay(tooltipData);
                        }}
                        onMouseLeave={() => {
                          setHoveredDay(null);
                        }}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-1.5 mt-2 text-[10px] text-muted-foreground">
          <span>Less</span>
          <div className="flex gap-0.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-muted" />
            <div className="w-2.5 h-2.5 rounded-sm bg-green-300 dark:bg-green-900/50" />
            <div className="w-2.5 h-2.5 rounded-sm bg-green-500 dark:bg-green-700/70" />
            <div className="w-2.5 h-2.5 rounded-sm bg-green-700 dark:bg-green-500/90" />
            <div className="w-2.5 h-2.5 rounded-sm bg-green-900 dark:bg-green-400" />
          </div>
          <span>More</span>
        </div>
      </div>

      {/* Tooltip */}
      {mounted &&
        hoveredDay &&
        createPortal(
          <div
            className="fixed z-[9999] px-3 py-2 text-xs bg-gray-900 text-white rounded-md shadow-2xl border-2 border-white/20 pointer-events-none"
            style={{
              left: `${hoveredDay.x}px`,
              top: `${hoveredDay.y - 70}px`,
              transform: "translateX(-50%)",
            }}
          >
            <div className="font-bold whitespace-nowrap">
              {hoveredDay.count} contribution
              {hoveredDay.count !== 1 ? "s" : ""}
            </div>
            <div className="text-gray-400 whitespace-nowrap text-[11px]">
              {hoveredDay.date}
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
