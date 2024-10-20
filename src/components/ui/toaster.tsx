"use client";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "../../components/ui/toast";
import { useToast } from "../../components/ui/use-toast";
import { cn } from "../../lib/utils";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        prefixComponent,
        ...props
      }) {
        return (
          <Toast key={id} {...props}>
            <div
              className={cn(
                "gap gap-1",
                prefixComponent &&
                  !description &&
                  !action &&
                  "flex flex-row gap-4"
              )}
            >
              {prefixComponent && prefixComponent}
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
