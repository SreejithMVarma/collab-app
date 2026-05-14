"use client";

import { Button } from "@/app/ui/button";

export type CalendarView = "day" | "week" | "month";

export function TopNavigation({
  rangeLabel,
  view,
  onPrev,
  onNext,
  onToday,
  onViewChange,
  onCreate,
}: {
  rangeLabel: string;
  view: CalendarView;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  onViewChange: (view: CalendarView) => void;
  onCreate: () => void;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border bg-card p-3">
      <div className="flex items-center gap-2 overflow-x-auto scroll-hide pb-1">
        <Button variant="outline" size="sm" onClick={onToday} className="shrink-0">Today</Button>
        <Button variant="outline" size="icon-sm" onClick={onPrev} aria-label="Previous" className="shrink-0">‹</Button>
        <Button variant="outline" size="icon-sm" onClick={onNext} aria-label="Next" className="shrink-0">›</Button>
        <div className="shrink-0 whitespace-nowrap text-sm font-medium">{rangeLabel}</div>
      </div>

      <div className="flex items-center justify-between gap-2 overflow-x-auto scroll-hide pb-1">
        <div className="inline-flex rounded-md border bg-background p-1">
          {(["day", "week", "month"] as CalendarView[]).map((item) => (
            <Button
              key={item}
              size="sm"
              variant={view === item ? "default" : "ghost"}
              className="capitalize"
              onClick={() => onViewChange(item)}
            >
              {item}
            </Button>
          ))}
        </div>

        <Button onClick={onCreate}>Create meeting</Button>
      </div>
    </div>
  );
}
