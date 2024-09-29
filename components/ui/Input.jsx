import React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-blue-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 ",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default function Component(props = {}) {
  return <Input {...props} />;
}
