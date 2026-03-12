import { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ContainerProps = {
  as?: "div" | "section" | "nav" | "header" | "footer";
  className?: string;
  children: ReactNode;
};

export function Container({ as, className, children }: ContainerProps) {
  const Component = as ?? "div";

  return (
    <Component className={cn("mx-auto w-full max-w-8xl px-5 sm:px-6 lg:px-8", className)}>
      {children}
    </Component>
  );
}
