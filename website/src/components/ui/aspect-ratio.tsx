"use client";

import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";

function cleanProps(props: any) {
 const cleaned: any = {};
 for (const [key, value] of Object.entries(props)) {
 if (!key.startsWith('_fg')) {
 cleaned[key] = value;
 }
 }
 return cleaned;
}

function AspectRatio({
 ...props
}: React.ComponentProps<typeof AspectRatioPrimitive.Root>) {
 return <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...cleanProps(props)} />;
}

export { AspectRatio };
