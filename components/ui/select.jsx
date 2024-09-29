import React, { createContext, useContext, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

const SelectContext = createContext();

const Select = React.forwardRef(
  ({ children, onValueChange, defaultValue, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(defaultValue || "");

    const handleSelect = (value) => {
      setSelectedValue(value);
      setIsOpen(false);
      if (onValueChange) {
        onValueChange(value);
      }
    };

    return (
      <SelectContext.Provider
        value={{ isOpen, setIsOpen, selectedValue, handleSelect }}
      >
        <div className="relative" ref={ref} {...props}>
          {children}
        </div>
      </SelectContext.Provider>
    );
  }
);
Select.displayName = "Select";

const SelectTrigger = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    const { isOpen, setIsOpen, selectedValue } = useContext(SelectContext);

    return (
      <button
        type="button"
        role="combobox"
        aria-expanded={isOpen}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        onClick={() => setIsOpen(!isOpen)}
        ref={ref}
        {...props}
      >
        {children}
        <ChevronDown className="h-4 w-4 opacity-50" />
      </button>
    );
  }
);
SelectTrigger.displayName = "SelectTrigger";

const SelectValue = React.forwardRef(
  ({ className, placeholder, ...props }, ref) => {
    const { selectedValue } = useContext(SelectContext);

    return (
      <span className={cn("block truncate", className)} ref={ref} {...props}>
        {selectedValue || placeholder}
      </span>
    );
  }
);
SelectValue.displayName = "SelectValue";

const SelectContent = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    const { isOpen } = useContext(SelectContext);

    if (!isOpen) return null;

    return (
      <div
        className={cn(
          "absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80",
          className
        )}
        ref={ref}
        {...props}
      >
        <ul className="p-1">{children}</ul>
      </div>
    );
  }
);
SelectContent.displayName = "SelectContent";

const SelectItem = React.forwardRef(
  ({ className, children, value, ...props }, ref) => {
    const { handleSelect, selectedValue } = useContext(SelectContext);

    return (
      <li
        className={cn(
          "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          selectedValue === value && "bg-accent text-accent-foreground",
          className
        )}
        onClick={() => handleSelect(value)}
        ref={ref}
        {...props}
      >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          {selectedValue === value && (
            <span className="h-2 w-2 rounded-full bg-current" />
          )}
        </span>
        {children}
      </li>
    );
  }
);
SelectItem.displayName = "SelectItem";

// Keeping SelectOption for backwards compatibility
const SelectOption = SelectItem;

export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectOption,
};
