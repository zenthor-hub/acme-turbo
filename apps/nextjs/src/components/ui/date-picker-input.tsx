"use client";

import { useId, useState } from "react";
import { subYears } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateTime } from "luxon";

import { Button, buttonVariants } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";

export function DatePickerInput({
  label,
  isOptional,
  dob,
  setDOB,
}: {
  label?: string;
  isOptional?: boolean;
  dob: Date | undefined;
  setDOB: (value: Date | undefined) => void;
}) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleSelect = (date: Date | undefined) => {
    setDOB(date);
    setIsPopoverOpen(false);
  };

  const id = useId();
  return (
    <div className="flex w-full flex-col gap-2">
      {label && (
        <div className="flex items-center justify-between gap-2">
          <label
            htmlFor={id}
            className="block text-sm font-medium leading-tight text-gray-900"
          >
            {label}
          </label>
          {isOptional && (
            <span className="text-sm leading-tight text-gray-400">
              Optional
            </span>
          )}
        </div>
      )}
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className="justify-start! border-gray-300! h-[42px] w-full rounded-xl border pl-3 font-normal shadow-none hover:bg-white"
            // disabled={disabled}
            onClick={() => setIsPopoverOpen(!isPopoverOpen)}
          >
            <CalendarIcon className="h-4 w-4 opacity-50" />
            {dob ? (
              DateTime.fromJSDate(dob).toFormat("dd/LL/yyyy")
            ) : (
              <span>Selecione uma data</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="red-500 w-full border border-gray-300 p-0 font-mono text-black">
          <Calendar
            classNames={{
              day_disabled: "hover:bg-transparent",
              row: "flex w-full mt-2 gap-x-2",
              cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-gray-300 [&:has([aria-selected])]:rounded-lg focus-within:relative focus-within:z-20",
              // first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md
              day: cn(
                buttonVariants({ variant: "ghost" }),
                "h-9 w-9 p-0 font-normal hover:bg-gray-300 aria-selected:opacity-100",
              ),
              day_selected:
                "rounded-full bg-gray-200 hover:bg-gray-200 text-primary-foreground",
              caption_label: "hidden",
              caption_dropdowns:
                "flex w-full items-center justify-center space-x-2 [&>select]:max-h-[100px]",
            }}
            mode="single"
            selected={dob}
            fromDate={subYears(new Date(), 100)}
            toDate={new Date()}
            captionLayout="dropdown"
            onSelect={handleSelect}
            defaultMonth={
              new Date(
                dob?.getFullYear() ?? new Date().getFullYear(),
                dob?.getMonth() ?? new Date().getMonth(),
                1,
              )
            }
            required
            initialFocus
            className="rounded-md border border-gray-200"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
