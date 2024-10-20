"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
// import { Check } from "lucide-react";

import { cn } from "../../lib/utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-[18px] w-[18px] shrink-0 rounded-[4px] border-[1.5px] border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:border-[#9CA9B9] disabled:cursor-not-allowed disabled:bg-gray-200 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <div className="relative top-[-1px] left-[-1px] w-[14px] h-[14px]n">
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M14.3907 2.89482C14.7328 3.22322 14.7605 3.78526 14.4527 4.15016L6.95266 13.039C6.79973 13.2203 6.58369 13.3266 6.35516 13.333C6.12662 13.3394 5.90565 13.2454 5.74399 13.0729L1.57733 8.6285C1.25189 8.28137 1.25189 7.71856 1.57733 7.37142C1.90277 7.02429 2.4304 7.02429 2.75584 7.37142L6.30142 11.1534L13.2138 2.96089C13.5217 2.59599 14.0486 2.56641 14.3907 2.89482Z"
            fill="white"
          />
        </svg>
      </div>
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export default Checkbox;
