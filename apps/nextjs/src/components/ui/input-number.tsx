import type { InputNumberFormatProps } from "@react-input/number-format";
import { useId } from "react";
import {
  InputNumberFormat,
  unformat as unformatRoot,
} from "@react-input/number-format";
import { InfoIcon } from "lucide-react";

import { cn } from "~/lib/utils";
import { Input } from "./input";

export const parseNumber = (value: string) =>
  Number(unformatRoot(value, "pt-BR"));

export const InputNumber = ({
  ref,
  label,
  error,
  isOptional,
  className,
  ...otherProps
}: InputNumberFormatProps & {
  label?: string;
  error?: string | false | undefined | null;
  isOptional?: boolean;
  className?: string;
} & { ref?: React.RefObject<HTMLInputElement> }) => {
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
      <div className="relative">
        <InputNumberFormat
          component={Input}
          ref={ref}
          aria-describedby={error ? `${id}-error` : undefined}
          required={!isOptional}
          className={cn(
            className,
            "h-10 border border-gray-300",
            error ? "border-red-300 bg-red-50" : "",
          )}
          {...otherProps}
          locales="pt-BR"
        />
      </div>
      {error && (
        <div
          className="flex items-center gap-1.5 text-nowrap text-sm text-red-600"
          id={`${id}-error`}
        >
          <InfoIcon className="size-4 text-red-500" />
          {error}
        </div>
      )}
    </div>
  );
};

InputNumber.displayName = "InputNumber";
