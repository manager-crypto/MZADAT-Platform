"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "./utils";

function cleanProps(props: any) {
 const cleaned: any = {};
 for (const [key, value] of Object.entries(props)) {
 if (!key.startsWith('_fg')) {
 cleaned[key] = value;
 }
 }
 return cleaned;
}

function Separator({
 className,
 orientation = "horizontal",
 decorative = true,
 ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
 return (
 <SeparatorPrimitive.Root
 data-slot="separator-root"
 decorative={decorative}
 orientation={orientation}
 className={cn(
 "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
 className,
 )}
 {...cleanProps(props)}
 />
 );
}

export { Separator };
