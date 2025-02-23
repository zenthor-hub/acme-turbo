"use client";

import type { DateRange } from "react-day-picker";
import * as React from "react";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Select } from "~/components/ui/select";
import { cn } from "~/lib/utils";

type CalendarDateRangePickerProps = React.HTMLAttributes<HTMLDivElement> & {
  // dateRange: DateRange | undefined;
  // onChangeDateRange: (dateRange: DateRange | undefined) => void;
};

export function CalendarDateRangePicker({
  className,
  // dateRange,onChangeDateRange
}: CalendarDateRangePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>(() => ({
    from: new Date(2023, 0, 20),
    to: addDays(new Date(2023, 0, 20), 20),
  }));
  const [year, setYear] = React.useState<string>("2023");

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2" align="end">
          <div className="grid grid-cols-4 gap-2">
            <div className="col-span-1">
              <Select
                // label="Estado Civil"
                // placeholder="Selecione um estado civil"
                // disabled={formIsPending}
                options={[2023, 2024, 2025].map((i) => ({
                  value: i.toString(),
                  label: i,
                }))}
                value={year}
                onValueChange={setYear}
              />
            </div>
          </div>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
