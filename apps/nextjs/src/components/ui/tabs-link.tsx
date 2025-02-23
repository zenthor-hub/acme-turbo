"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "~/lib/utils";

export const Tabs = ({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) => (
  <nav aria-label={label} className="flex items-end gap-8">
    {children}
  </nav>
);

export const Tab = ({
  href,
  label,
  badge,
  isActive,
}: {
  href: string;
  label: string;
  badge?: string;
  isActive?: boolean;
}) => {
  const pathname = usePathname();
  const isActiveValidation = isActive ?? pathname === href;
  return (
    <Link
      href={href}
      aria-current={isActiveValidation ? "page" : undefined}
      className={cn(
        "border-b-2 px-1 pb-2",
        isActiveValidation ? "border-gray-900" : "border-transparent",
      )}
    >
      <div
        className={cn(
          "flex items-center gap-2 text-sm font-medium leading-snug",
          isActiveValidation ? "text-gray-900" : "text-gray-300",
        )}
      >
        {label}{" "}
        {badge && (
          <span className="rounded border border-gray-50 px-[5px] py-[3px] text-[10px] leading-none">
            {badge}
          </span>
        )}
      </div>
    </Link>
  );
};
