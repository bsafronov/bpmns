import { forwardRef } from "react";
import { Button } from "./button";
import { Loader2 } from "lucide-react";

type LoadingButtonProps = Omit<
  React.ComponentPropsWithoutRef<typeof Button>,
  "asChild"
> & {
  isLoading?: boolean;
};

export const LoadingButton = forwardRef<HTMLButtonElement, LoadingButtonProps>(
  ({ isLoading, children, disabled, ...props }, ref) => {
    return (
      <Button ref={ref} disabled={disabled ?? isLoading} {...props}>
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        {children}
      </Button>
    );
  },
);

LoadingButton.displayName = "LoadingButton";
