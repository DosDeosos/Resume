"use client";

import { cn } from "@/lib/utils";
import { Tabs as TabsPrimitive } from "radix-ui";
import type { ComponentProps } from "react";

export function Tabs({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      className={cn("flex flex-col gap-4", className)}
      {...props}
    />
  );
}

export function TabsList({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      className={cn(
        "mx-auto inline-flex h-11 w-fit items-center justify-center gap-1 rounded-full bg-white/70 p-1 shadow-sm ring-1 ring-blue-900/10",
        className,
      )}
      {...props}
    />
  );
}

export function TabsTrigger({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        "inline-flex h-9 cursor-pointer items-center justify-center gap-1.5 rounded-full px-4 text-sm font-semibold whitespace-nowrap text-blue-900/70 transition-colors outline-none hover:text-blue-900 focus-visible:ring-2 focus-visible:ring-blue-900/60 data-[state=active]:bg-blue-900 data-[state=active]:text-white data-[state=active]:shadow-md [&_svg]:size-4",
        className,
      )}
      {...props}
    />
  );
}

export function TabsContent({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      className={cn(
        "data-[state=active]:animate-in data-[state=active]:fade-in-0 outline-none",
        className,
      )}
      {...props}
    />
  );
}
