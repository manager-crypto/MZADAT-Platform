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

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...cleanProps(props)}
    />
  );
}

export { Skeleton };
