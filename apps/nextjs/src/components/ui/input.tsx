import { useId } from "react";
import { InfoIcon } from "lucide-react";

import { cn } from "~/lib/utils";

export const Input = ({
  ref,
  label,
  error,
  leftIcon: LeftIcon,
  className,
  isOptional,
  ...otherProps
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string | false | undefined | null;
  leftIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
  isOptional?: boolean;
  className?: string;
} & { ref?: React.RefObject<HTMLInputElement> }) => {
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
            <span className="text-xs leading-tight text-gray-400">
              Opcional
            </span>
          )}
        </div>
      )}
      <div className="relative">
        {LeftIcon && (
          <LeftIcon className="absolute left-3 top-2.5 size-5 text-gray-900" />
        )}
        <input
          id={id}
          ref={ref}
          aria-describedby={error ? `${id}-error` : undefined}
          required={!isOptional}
          className={cn(
            "user-invalid:border-red-300 focus-visible:outline-hidden block w-full border border-gray-300 py-2 text-base text-gray-900 transition-colors placeholder:text-gray-300 focus-visible:border-gray-900 disabled:bg-gray-50 disabled:text-gray-400",
            "user-invalid:border-red-300 user-invalid:bg-red-50",
            LeftIcon ? "pl-10 pr-3" : "px-3",
            className,
          )}
          {...otherProps}
        />
      </div>
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

Input.displayName = "Input";
