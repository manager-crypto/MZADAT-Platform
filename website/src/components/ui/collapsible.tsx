"use client";

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

function cleanProps(props: any) {
 const cleaned: any = {};
 for (const [key, value] of Object.entries(props)) {
 if (!key.startsWith('_fg')) {
 cleaned[key] = value;
 }
 }
 return cleaned;
}

function Collapsible({
 ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
 return <CollapsiblePrimitive.Root data-slot="collapsible" {...cleanProps(props)} />;
}

function CollapsibleTrigger({
 ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) {
 return (
 <CollapsiblePrimitive.CollapsibleTrigger
 data-slot="collapsible-trigger"
 {...cleanProps(props)}
 />
 );
}

function CollapsibleContent({
 ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {
 return (
 <CollapsiblePrimitive.CollapsibleContent
 data-slot="collapsible-content"
 {...cleanProps(props)}
 />
 );
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
