"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";

export interface Option {
  value: string;
  label: string;
}

export function MultiCombobox({
  className,
  label,
  disabled,
  options,
  placeholder = "Select options...",
  emptyText = "No options found.",
  onValueChangeAction,
}: {
  className?: string;
  label?: string;
  disabled?: boolean;
  options: { value: string; label: string; imageSrc?: string }[];
  placeholder?: string;
  emptyText?: string;
  value: string[];
  onValueChangeAction: (value: string[]) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Option[]>([]);
  const [inputValue, setInputValue] = React.useState("");

  const handleUnselect = (option: Option) => {
    setSelected(selected.filter((s) => s.value !== option.value));
  };

  const handleSelect = (option: Option) => {
    setSelected([...selected, option]);
    setInputValue("");
  };

  React.useEffect(() => {
    onValueChangeAction(selected.map((s) => s.value));
  }, [selected, onValueChangeAction]);

  const id = React.useId();

  return (
    <div className={cn("flex w-full max-w-[400px] flex-col gap-2", className)}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium">
          {label}
        </label>
      )}
      <div className="flex w-full max-w-[400px] flex-col gap-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              disabled={disabled}
              aria-expanded={open}
              className="w-full justify-between"
            >
              <span className="truncate text-muted-foreground">
                {selected.length > 0
                  ? `${selected.length} selected`
                  : placeholder}
              </span>
              <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="w-[var(--radix-popover-trigger-width)] p-0"
          >
            <Command>
              <CommandInput
                placeholder="Search options..."
                value={inputValue}
                onValueChange={setInputValue}
              />
              <CommandList>
                <CommandEmpty>{emptyText}</CommandEmpty>
                <CommandGroup>
                  {options.map((option) => (
                    <CommandItem
                      key={option.value}
                      onSelect={() => {
                        if (selected.some((s) => s.value === option.value)) {
                          handleUnselect(option);
                        } else {
                          handleSelect(option);
                        }
                        setOpen(true);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selected.some((s) => s.value === option.value)
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        {selected.length > 0 && (
          <div className="flex flex-wrap gap-1 rounded-md border bg-muted/50 p-1">
            {selected.map((option) => (
              <Badge
                key={option.value}
                variant="secondary"
                className="shrink-0 select-none"
              >
                {option.label}
                <span
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleUnselect(option);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleUnselect(option);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`Remove ${option.label}`}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </span>
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
