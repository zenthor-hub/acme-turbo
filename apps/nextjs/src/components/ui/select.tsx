import type { VariantProps } from "class-variance-authority";
import { useId } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cva } from "class-variance-authority";
import { CheckIcon, ChevronDownIcon, InfoIcon } from "lucide-react";

const triggerVariants = cva(
  "data-[state=open]:border-1 data-placeholder:text-gray-300 user-invalid:border-red-300 focus-visible:outline-hidden group flex w-full items-center justify-between text-base text-gray-900 transition-colors focus-visible:border-gray-900 disabled:bg-gray-50 disabled:text-gray-400 data-[state=open]:border-gray-900",
  {
    variants: {
      size: {
        extraSmall: "h-[1.625rem] gap-2 px-3 text-sm",
        small: "h-8 gap-2 px-3 py-1.5 text-sm",
        mid: "h-10 gap-2.5 px-5 py-2.5 text-base",
        large: "h-14 gap-2.5 px-6 py-4 text-xl",
      },
      variant: {
        bordered: "border border-gray-300 bg-white",
        editor: "bg-white hover:bg-gray-50/75 active:bg-gray-50",
        calendar: "bg-slate-50 hover:bg-slate-100 active:bg-slate-200",
      },
    },
    defaultVariants: {
      size: "mid",
      variant: "bordered",
    },
  },
);

export const SelectOption = (props: {
  value: string;
  label: string | React.ReactNode;
  icon?: React.ReactNode;
}) => (
  <SelectPrimitive.Item
    key={props.value}
    value={props.value}
    className="focus-visible:outline-hidden flex cursor-pointer select-none items-center gap-2 px-3 py-1.5 transition-colors focus-visible:bg-gray-50/50 active:bg-gray-50"
  >
    {props.icon}
    <SelectPrimitive.ItemText className="text-sm text-gray-900">
      {props.label}
    </SelectPrimitive.ItemText>
    <div className="flex-1"></div>
    <SelectPrimitive.ItemIndicator>
      <CheckIcon className="size-4 text-gray-900" />
    </SelectPrimitive.ItemIndicator>
  </SelectPrimitive.Item>
);

export const Select = <T extends string>({
  label,
  placeholder,
  error,
  value,
  onValueChange,
  options,
  size,
  disabled,
  variant,
  valueDisplay: ValueDisplay,
  children,
  required,
  isOptional,
}: {
  label?: string;
  placeholder?: string;
  error?: string | false | undefined | null;
  value: T | undefined;
  onValueChange: (value: T) => void;
  disabled?: boolean;
  valueDisplay?: React.FC<{ value: T | undefined }>;
  required?: boolean;
  isOptional?: boolean;
} & (
  | {
      options: {
        value: T;
        label: string | React.ReactNode;
        icon?: React.ReactNode;
      }[];
      children?: never;
    }
  | {
      children: React.ReactNode;
      options?: never;
    }
) &
  VariantProps<typeof triggerVariants>) => {
  const id = useId();
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <div className="flex items-center justify-between gap-2">
          <label
            htmlFor={id}
            className="block text-sm font-medium leading-tight text-gray-900"
          >
            {label}
          </label>
          {isOptional && (
            <span className="text-xs leading-tight text-gray-400">
              Opcional
            </span>
          )}
        </div>
      )}
      <SelectPrimitive.Root
        value={value}
        onValueChange={(v) => onValueChange(v as T)}
        disabled={disabled}
        required={required}
      >
        <SelectPrimitive.Trigger
          id={id}
          className={triggerVariants({ size, variant })}
          aria-describedby={error ? `${id}-error` : undefined}
        >
          {/* {!value && <SelectPrimitive.pla>{placeholder}</SelectPrimitive.Placeholder>} */}
          {ValueDisplay ? (
            <ValueDisplay value={value} />
          ) : (
            <SelectPrimitive.Value
              placeholder={placeholder}
              className="h-10 w-full flex-1"
            />
          )}
          <SelectPrimitive.Icon className="transition-transform group-data-[state=open]:rotate-180">
            <ChevronDownIcon className="size-5" />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Content
          position="popper"
          className="starting:-translate-y-2 starting:scale-95 relative z-50 flex max-h-96 w-[var(--radix-popper-anchor-width)] min-w-[12rem] flex-col gap-1 overflow-hidden overflow-y-auto border border-gray-200 bg-white p-2 shadow-lg transition-transform data-[state=closed]:scale-95"
        >
          {options?.map((option) => (
            <SelectOption
              key={option.value as string}
              label={option.label}
              value={option.value as string}
              icon={option.icon}
            />
          ))}
          {children}
        </SelectPrimitive.Content>
      </SelectPrimitive.Root>
      {error && (
        <div
          className="flex items-center gap-1.5 text-sm text-red-600"
          id={`${id}-error`}
        >
          <InfoIcon className="size-4 text-red-500" />
          {error}
        </div>
      )}
    </div>
  );
};
